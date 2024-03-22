function deleteUser(id) {
  axios
    .delete(`/admin/deleteUser/${id}`)
    .then((result) => {
      window.location.reload();
    })
    .catch((error) => {
      alert("that bai");
    });
}
