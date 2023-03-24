import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Samples

//   Toast.fire({
//     icon: 'success',
//     title: 'Signed in successfully'
//   })

// swalWithBootstrapButtons.fire({
//   title: 'Are you sure?',
//   text: "You won't be able to revert this!",
//   icon: 'warning',
//   showCancelButton: true,
//   confirmButtonText: 'Yes, delete it!',
//   cancelButtonText: 'No, cancel!',
//   reverseButtons: true
// }).then((result) => {
//   if (result.isConfirmed) {
//     swalWithBootstrapButtons.fire(
//       'Deleted!',
//       'Your file has been deleted.',
//       'success'
//     )
//   } else if (
//     /* Read more about handling dismissals below */
//     result.dismiss === Swal.DismissReason.cancel
//   ) {
//     swalWithBootstrapButtons.fire(
//       'Cancelled',
//       'Your imaginary file is safe :)',
//       'error'
//     )
//   }
// })

export const useSweetAlert = () => {
  return { Toast };
};
