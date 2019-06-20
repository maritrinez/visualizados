function runApp(){
  var app = new Vue({
    el: '#app',
    data: {
      adult: "madre",
      position: "calle",
      notes: "",
      date: null,
      lat: null,
      lon: null,
      successMsg: null,
      errorMsg: null
    },
    methods: {
      resetForm(){
        this.adult = "madre";
        this.position = "calle";
        this.notes = "";
        this.date = null;
      },
      success(){
        this.successMsg = "Anotación guardada";
      },
      error(){
        this.errorMsg = "Error al guardar. Llama al informático"
      },
      submitForm: function(){
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position){
          that.lat = position.coords.latitude;
          that.lon = position.coords.longitude;
          console.log(that.lat);

          that.successMsg = null;
          that.errorMsg = null;
          that.date = new Date();

          var apiKey = "Bearer keyi2MaEeYPPHN3jz";
          var body = JSON.stringify({
            fields: {
              fecha: that.date,
              latitud: that.lat.toString(),
              longitud: that.lon.toString(),
              adulto: that.adult,
              situacion: that.position,
              notas: that.notes
            }
          });
          console.log(body);
          fetch('https://api.airtable.com/v0/appyulBaKwT6aWz9k/Anotaciones', {
            method: 'POST',
            headers: {
              "Authorization": apiKey,
              "Content-Type": "application/json"
            },
            body: body
          }).then((res) => {
            console.log(res);
            that.resetForm();
            that.success();
          })
          .catch((err)=>{that.error();console.log(err);})
        });
      }
    }
  })
}

window.addEventListener('DOMContentLoaded', function(event){
  console.log('hey');
  runApp();
});
