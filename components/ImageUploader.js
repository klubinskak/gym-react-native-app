import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@rneui/themed';
import tw from "twrnc";
import fileUpload from '../assets/filesupload.png';



export default function UploadImage() {
  const [image, setImage] = useState(null);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.uri);
    }
  };


  return (
            <View style={imageUploaderStyles.container}>
                {
                    image  && <View> 
                        <Image source={{ uri: image }} style={{ width: 350, height: 200, borderRadius: 10, position: 'absolute' }} />
                        <Icon name="delete" size={30} color="white" style={{position: 'relative', top: 5, left: 150}} onPress={() => setImage(null)}/>
                        </View>
                }
                { !image &&
                    <View style={imageUploaderStyles.uploadContainer}>
                        <TouchableOpacity onPress={addImage} style={tw`p-5 justify-center items-center`} >
                            <Image source={fileUpload} style={tw`w-[180px] h-[150px]`} /> 
                            <Text style={tw`text-blue-400 `}>{image ? 'Edit' : 'Upload'} Image</Text>
                        </TouchableOpacity>
                    </View>
}
            </View>
  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:220,
        width:350,
        borderRadius: 10,
        position:'relative',
        top: 10,
        left: 20,
        overflow:'hidden',
        
    },
    uploadContainer:{
    },
    trash: {
        position: 'absolute',
        top: 1000,
        zIndex: 100,
    }
})