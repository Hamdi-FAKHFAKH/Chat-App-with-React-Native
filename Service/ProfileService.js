import * as ImagePicker from 'expo-image-picker';

/********************************************************** upload image from phone ********************************************* */
export async function pickImage(setImage) {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    setImage(result.uri);
  }
}
/**  convertir une image en format de Blob */
async function imageToBlob(url) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob'; // arraybuffer
    xhr.open('GET', url, true);
    xhr.send(null);
  });
  return blob;
}

/** enregitrer un image dans le storage */

export async function uploadImage(url, storage) {
  //conert image to blob
  const blob = await imageToBlob(url);
  //save blob to refernce image
  const ref_img = storage
    .ref()
    .child('images profile')
    .child('image.jpg');
  await ref_img.put(blob);
  //get url
  const myurl = ref_img.getDownloadURL();
  return myurl;
}
