function submitChangeRole(e, id) {
  const selectRoleId = e.value;
  const userId = id;

  axios
    .put(`/admin/update/${userId}`, { role: selectRoleId })
    .then((res) => {
      e.style.background = "#84dd89";
    })
    .catch((err) => {
      e.style.background = "rgb(255,86,86)";
    })
    .finally(() => {
      setTimeout(function () {
        e.style.background = "";
      }, 2000);
    });
}

// Change faculty
function submitChangeFaculties(e, id) {
  const selectFacultyId = e.value;
  const userId = id;

  console.log("selectFacultyId: ", selectFacultyId);

  axios
    .put(`/admin/update/${userId}`, { facultis: selectFacultyId })
    .then((res) => {
      e.style.background = "#84dd89";
    })
    .catch((err) => {
      e.style.background = "rgb(255,86,86)";
    })
    .finally(() => {
      setTimeout(function () {
        e.style.background = "";
      }, 2000);
    });
}

// ChangeCloseDate

function submitChangeCloseDate(e, id) {
  const selectCloseDateId = e.value;
  const userId = id;

  console.log("selectCloseDate: ", selectCloseDateId);

  axios
    .put(`/admin/update/${userId}`, { closedate: selectCloseDateId })
    .then((res) => {
      e.style.background = "#84dd89";
    })
    .catch((err) => {
      e.style.background = "rgb(255,86,86)";
    })
    .finally(() => {
      setTimeout(function () {
        e.style.background = "";
      }, 2000);
    });
}

function upA(id) {
  var academicYearsInput = document.getElementById("academicYears_" + id);
  var academicYears = academicYearsInput ? academicYearsInput.value : "";
  var EndInput = document.getElementById("End_" + id);
  var End = EndInput ? EndInput.value : "";

  axios
    .put(`/admin/updateA/${id}`, { academicYears, End })
    .then((data) => {
      console.log(data);
      return window.location.reload();
    })
    .catch((error) => {
      return alert("failed");
    });
}

function deA(id) {
  axios
    .delete(`/admin/deleteAcademic/${id}`)
    .then((result) => {
      window.location.reload();
    })
    .catch((error) => {
      alert("that bai");
    });
}

function updateFa(id) {
  var nameFacultyInput = document.getElementById("nameFaculty_" + id);
  var nameFaculty = nameFacultyInput ? nameFacultyInput.value : "";
  axios
    .put(`/admin/updateFa/${id}`, { nameFaculty })
    .then((data) => {
      console.log(data);
      return window.location.reload();
    })
    .catch((error) => {
      return alert("failed");
    });
}

function deleteFa(id) {
  axios
    .delete(`/admin/deleteFa/${id}`)
    .then((result) => {
      window.location.reload();
    })
    .catch((error) => {
      alert("that bai");
    });
}

function subAca(e, id) {
  const selectAcaId = e.value;
  console.log(selectAcaId);
  axios
    .put(`/admin/closedateUp/${id}`, { academic: selectAcaId })
    .then((data) => {
      console.log(data);
      return window.location.reload();
    })
    .catch((error) => {
      return alert("failed");
    });
}

function subFa(e, id) {
  const selectFaId = e.value;
  axios
    .put(`/admin/closedateUp/${id}`, { faculty: selectFaId })
    .then((data) => {
      console.log(data);
      return window.location.reload();
    })
    .catch((error) => {
      return alert("failed");
    });
}

function closedateUp(id) {
  var closedateInput = document.getElementById("closedate_" + id);
  var closeDates = closedateInput ? closedateInput.value : "";
  var finalCloseDatesInput = document.getElementById("finalCloseDates_" + id);
  var finalCloseDates = finalCloseDatesInput ? finalCloseDatesInput.value : "";

  axios
    .put(`/admin/closedateUp/${id}`, { finalCloseDates, closeDates })
    .then((data) => {
      console.log(data);
      return window.location.reload();
    })
    .catch((error) => {
      return alert("failed");
    });
}

function deleteClose(id) {
  axios
    .delete(`/admin/deleteCloseDates/${id}`)
    .then((result) => {
      window.location.reload();
    })
    .catch((error) => {
      alert("that bai");
    });
}

function deleteAr(id) {
  axios
    .delete(`/admin/deleteAr/${id}`)
    .then((result) => {
      window.location.reload();
    })
    .catch((error) => {
      alert("that bai");
    });
}

//chart
function viewDocument(docUrl) {
  var viewer = document.getElementById("documentViewer");
  viewer.src = docUrl;
  $("#documentModal").modal("show");
}
