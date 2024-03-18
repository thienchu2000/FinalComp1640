function updateAr(id) {
  var description = document.getElementById("description").value;
  var comment = document.getElementById("comment").value;
  var status = document.querySelector('input[name="status"]:checked').value;
  console.log(status);
  axios
    .put(`/coordinator/updateAr/${id}`, { description, comment, status })
    .then((data) => {
      console.log(data);
      return window.location.reload();
    })
    .catch((error) => {
      return alert("thatbai");
    });
}
