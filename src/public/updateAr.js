function updateAr(id) {
  var descriptionInput = document.getElementById("description_" + id);
  var description = descriptionInput ? descriptionInput.value : "";
  var commentInput = document.getElementById("comment_" + id);
  var comment = commentInput ? commentInput.value : "";
  var statusInput = document.querySelector(
    'input[name="status_' + id + '" ]:checked'
  );
  var status = statusInput ? statusInput.value : "";

  var guestInput = document.querySelector(
    'input[name="guest_' + id + '" ]:checked'
  );
  var guest = guestInput ? guestInput.value : "";

  axios
    .put(`/coordinator/updateAr/${id}`, { description, comment, status, guest })
    .then((data) => {
      console.log(data);
      return window.location.reload();
    })
    .catch((error) => {
      return alert("failed ");
    });
}
