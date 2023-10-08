function currentDay(){
    const currentDate = new Date();
  
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
  
    const formatted = month + "/" + day + "/" + year;
  
    document.getElementById("currentDate").textContent = formatted;
  }
  currentDay();