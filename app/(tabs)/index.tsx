import { Button, Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useIDataIntent from "../useIDataIntent";

export default function HomeScreen() {
  const { codes, clear } = useIDataIntent();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">IData Prototype</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {codes.map((c, index) => {
          return <ThemedText key={index}>{c}</ThemedText>;
        })}
      </ThemedView>
      {codes && codes.length ? <Button onPress={clear} title="Clear" /> : null}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
