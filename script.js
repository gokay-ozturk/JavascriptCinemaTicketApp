const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const text = document.getElementById('text');
const allSeats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();
container.addEventListener('click', function(e){
    if(e.target.classList.contains('col') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');        

        calculateTotal();
    }
});

select.addEventListener('change', function(e){
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.col.selected');

    const selectedSeatsArray = [];
    const allSeatsArray = [];

    selectedSeats.forEach(seat=>{
        selectedSeatsArray.push(seat);
    });
    allSeats.forEach(seat=>{
        allSeatsArray.push(seat);
    });
    
    let selectedSeatIndexes= selectedSeatsArray.map(seat=>{
        return allSeatsArray.indexOf(seat);
    });

    let selectedSeatCount = container.querySelectorAll('.col.selected').length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexes);
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedSeats !=null && selectedSeats.length > 0) {
        allSeats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    if(selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexes){
    localStorage.setItem('selectedSeats', JSON.stringify(indexes));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}
