import axios from "axios";

// -----------------Images-------------------------
// Upload Image
export async function upload_img(img) {
  const response = await axios.post("http://localhost:4500/upload_image", img, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.imagePath;
}

// Delete Image
export async function delete_img(img_name) {
  try {
    try {
      const response = await axios.delete(
        `http://localhost:4500/delete_image/${img_name}`
      );

      return response.data;
    } catch (err) {}
  } catch (e) {}
}
// -----------------------------Videos-------------------------

// Upload Video
export async function upload_video(video) {
  const response = await axios.post(
    "http://localhost:4600/upload_video",
    video,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log(response.data);
  return response.data.videoPath;
}

// Delete Video
export async function delete_video(video_name) {
  const response = await axios.delete(
    `http://localhost:4600/delete_video/${video_name}`
  );

  return response.data;
}

// ---------------------PDFs-----------------------

// Upload PDF
export async function upload_pdf(pdf) {
  try {
    const response = await axios.post("http://localhost:4700/upload_pdf", pdf, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.pdfPath;
  } catch (error) {}
}

// Delete PDF
export async function delete_pdf(pdf_name) {
  const response = await axios.delete(
    `http://localhost:4700/delete_pdf/${pdf_name}`
  );

  return response.data;
}

