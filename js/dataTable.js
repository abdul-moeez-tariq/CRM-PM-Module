export function initUsersTable() {

  // check if table exists (important for SPA)
  const tableEl = document.getElementById("usersTable");
  if (!tableEl) return;

  // initialize DataTable
  const table = $("#usersTable").DataTable({
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    ordering: true,
    searching: true,
    paging: true,
    info: true,
    columnDefs: [{ orderable: false, targets: 0 }],
    stripeClasses: ["bg-white", "#F9FAFB"],

    language: {
      search: "",
      searchPlaceholder: "Search by User Id, User Name...",
      lengthMenu: "Rows per page: _MENU_",
      info: "Showing _START_ to _END_ of _TOTAL_ employees",
      paginate: {
        previous: "Previous",
        next: "Next",
      },
      emptyTable: "No users found",
      infoEmpty: "Showing 0 to 0 of 0 employees",
    },
  });

  // ===============================
  // Select All checkbox
  // ===============================

  $("#selectAll").on("change", function () {
    $(".row-checkbox").prop("checked", this.checked);
    updateSelectedCount();
  });


  $("#usersTable tbody").on("change", ".row-checkbox", function () {

    const total = $(".row-checkbox").length;
    const checked = $(".row-checkbox:checked").length;

    $("#selectAll").prop("checked", total === checked);

    $("#selectAll").prop(
      "indeterminate",
      checked > 0 && checked < total
    );

    updateSelectedCount();
  });


  function updateSelectedCount() {
    const count = $(".row-checkbox:checked").length;
    $("#selectedCount").text(count + " selected");
  }

}



export function initDelete() {
  const deleteBtn = document.getElementById('deleteBtn');
  const deleteModal = document.getElementById('deleteModal');
  if (!deleteBtn || !deleteModal) return;

  const cancelBtn = deleteModal.querySelector('button:first-child');
  const confirmBtn = deleteModal.querySelector('button:last-child');
  const inputField = deleteModal.querySelector('input');

  // Open modal
  deleteBtn.addEventListener('click', () => {
    deleteModal.classList.remove('hidden');
    inputField.value = '';
    confirmBtn.disabled = true;
    confirmBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
    confirmBtn.classList.remove('bg-red-600', 'text-white');
  });

  // Close modal
  cancelBtn.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
  });

  // Enable Delete button if input is DELETE
  inputField.addEventListener('input', () => {
    if (inputField.value.trim().toUpperCase() === 'DELETE') {
      confirmBtn.disabled = false;
      confirmBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
      confirmBtn.classList.add('bg-red-600', 'text-white');
    } else {
      confirmBtn.disabled = true;
      confirmBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
      confirmBtn.classList.remove('bg-red-600', 'text-white');
    }
  });

  // Delete action
  confirmBtn.addEventListener('click', () => {// yahan apna delete logic
    deleteModal.classList.add('hidden');
  });
}