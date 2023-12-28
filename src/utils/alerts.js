import Swal from 'sweetalert2';

export const sweetAlert = (icon, title, text = '', timer = 1500) => {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: timer,
  });
};
