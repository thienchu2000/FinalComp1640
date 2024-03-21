function downloadZip(id) {
  axios({
    url: `/manager/downloaded/${id}`,
    method: "GET",
    ResponseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filename.zip");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      return;
      alert("Error downloading");
    });
}
