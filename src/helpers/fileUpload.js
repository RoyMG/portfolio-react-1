export const fileUpload = async(file) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dwcn29njk/upload'

  const formData = new FormData();
  if (!file) throw new Error('There is no file')

  formData.append("upload_preset", 'react-journal')
  formData.append("file", file)

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData
    })
    if(!resp.ok) throw new Error("Could not upload the image")

    const cloudResp = await resp.json();

    return cloudResp.secure_url 
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}