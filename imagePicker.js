import { Alert, Button, View, Image, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermission = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted; // true if permission is granted, false otherwise
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      // allowsEditing: true, // allow the user to edit the photo
      aspect: [16, 9], // define on a matrix of two numbers [16, 9],
      quality: 0.5,
    });
    console.log(image);
    setPickedImage(image.assets[0].uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;
  if (pickedImage) {
    imagePreview = (
      <Image
        source={{ uri: pickedImage }}
        style={{
          width: "100%",
          height: 200,
          marginVertical: 8,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4
        }}
      />
    );
  }
  return (
    <View>
      <View>{imagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler}></Button>
    </View>
  );
};

export default ImagePicker;
