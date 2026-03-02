const IMGBB_API_KEY = "5e389c8c06c62109d27c69df759d6c6d";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to ImgBB");
    }

    const data = await response.json();
    return data.data.url;
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    throw error;
  }
}
