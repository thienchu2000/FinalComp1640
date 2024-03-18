function updateAr(id) {
  console.log("update");
  var description = document.getElementById("description").value;
  var comment = document.getElementById("comment").value;
  var status = document.getElementById("status").value;
  console.log(description, comment, status);
  axios
    .put(`/coordinator/updateAr/${id}`, { description, comment, status })
    .then(() => {
      return alert("success");
    })
    .catch((error) => {
      console.log(error);
      return alert("thatbai");
    });
}
