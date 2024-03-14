function changeUser(_id) {
  var name = document.getElementById("name").value;
  var lastName = document.getElementById("lastName").value;
  var firstName = document.getElementById("firstName").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;

  axios
    .put(`/users/changeUser/${_id}`, {
      name,
      lastName,
      address,
      phone,
      firstName,
    })
    .then((data) => {
      return alert("Done");
    })
    .catch(function (error) {
      return alert("Can't change user");
    });
}
