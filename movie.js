const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWJhNTBjM2QzYmNkM2MwYTFlNTY5ODQ3MjVjOGI5YiIsInN1YiI6IjY2Mjc5YzdmNjNkOTM3MDE2NDczNjE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFMshiEk0fPnYsxW-pIEyfKvjmANU7gtPKy8-zEO-OE'
    }
};
// 함수 만들기 함수형프로그래밍,클래스 강의

const movieContainer = document.getElementById('movie-cards');
let movieData = new Map();

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        movies.forEach(movie => {
            // 데이터 배열을 순회하면서 각각의 요소를 가지고 카드 만들기
            // 카드 생성하기
            movieData.set(movie.title, {
                title: movie.title,
                poster_path: movie.poster_path,
                overview: movie.overview,
                voteAverage: movie.vote_average,
            })

            const card = document.createElement('div');
            card.classList.add('movie_card');
            card.id = movie.id;

            // 포스터 이미지
            const poster = document.createElement('img');
            poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            poster.alt = movie.title;

            // 제목
            const title = document.createElement('h3');
            title.textContent = movie.title;
            title.classList.add('movie_title');

            // 평점
            const voteAverage = document.createElement('p');
            voteAverage.textContent = `평점: ${movie.vote_average}`;

            // 내용 요약
            const overview = document.createElement('p');
            overview.textContent = movie.overview;

            // 카드에 요소 추가
            card.appendChild(poster);
            card.appendChild(title);
            card.appendChild(voteAverage);
            card.appendChild(overview);

            // 컨테이너에 카드 추가  
            movieContainer.appendChild(card);
        })
        clickEventToCards();
    }).catch(err => console.error('데이터 불러오기 중 에러 발생!'));


// 카드 클릭하면 해당 영화의 id값을 알럿으로 보여주는 이벤트 함수 생성 
function cardClick(movieId) {
    alert(`영화 id: ${movieId}`);
}

function clickEventToCards() {
    const cards = document.querySelectorAll('.movie_card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.id;
            cardClick(movieId);
        });
    });
}

// 전체 영화 카드 리스트 선택 - 쿼리셀렉터올?.. 
// 영화제목이 검색한 문자값을 포함하는지 순회
// 해당하는 값만 화면에 보이도록 .

// 입력창 요소, 검색 버튼 가져오기
const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');

function searchMovies() {
    const keyword = searchBox.value;
    const newfiltered = new Map();

    movieContainer.innerHTML = '';

    movieData.forEach((movie, title) => {
        if (title.toLowerCase().includes(keyword.toLowerCase())) {

        const card = document.createElement('div');
        card.classList.add('movie_card');
        card.id = movie.id;

        // 포스터 이미지
        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        poster.alt = movie.title;

        // 제목
        const title1 = document.createElement('h3');
        title1.textContent = movie.title;
        title1.classList.add('movie_title');

        // 평점
        const voteAverage = document.createElement('p');
        voteAverage.textContent = `평점: ${movie.voteAverage}`;
        console.log(voteAverage);

        // 내용 요약
        const overview = document.createElement('p');
        overview.textContent = movie.overview;

        // 카드에 요소 추가
        card.appendChild(poster);
        card.appendChild(title1);
        card.appendChild(voteAverage);
        card.appendChild(overview);

        // 컨테이너에 카드 추가  
        movieContainer.appendChild(card);

        }

    })

    return newfiltered;

}

searchBtn.addEventListener('click', () => {
    const keyword = searchBox.value;
    searchMovies();
});