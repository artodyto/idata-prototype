import { useEffect, useRef, useState } from "react";
import { DeviceEventEmitter, EmitterSubscription } from "react-native";
//@ts-ignore
import IdataScanner from "react-native-idata-scanner";

const useIDataIntent = () => {
  const deviceEmitterSubscription = useRef<EmitterSubscription>();
  const [codes, setCodes] = useState<string[]>([]);

  const handler = useRef<NodeJS.Timeout>();

  const register = () => {
    const rows = [{ key: "barcode_send_mode", value: "BROADCAST" }];
    IdataScanner.setBroadcastSetting(
      "com.android.scanner.service_settings",
      rows
    );
  };

  IdataScanner.getCode("android.intent.action.SCANRESULT", "value");

  useEffect(() => {
    deviceEmitterSubscription.current = DeviceEventEmitter.addListener(
      "scannerCodeShow",
      ({ code }) => {
        if (handler.current) return;

        handler.current = setTimeout(() => {
          setCodes((prev) => [...prev, code]);
          handler.current = undefined;
        }, 500); // 500ms delay

        return () => {
          if (handler.current) {
            clearTimeout(handler.current);
            handler.current = undefined;
          }
        };
      }
    );

    register();

    return () => {
      if (!deviceEmitterSubscription || !deviceEmitterSubscription.current)
        return;
      deviceEmitterSubscription.current.remove();
    };
  }, []);

  return { codes, clear: () => setCodes([]) };
};

export default useIDataIntent;
