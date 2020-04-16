import swal from 'sweetalert';
export  const sweetAlert = (data)=>{
    swal({
        title: data.title,
        text: data.text,
        icon: data.icon,
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal(data.delete, {
            icon: "success",
          });
        } else {
          swal(data.noDelete);
        }
      });
}
