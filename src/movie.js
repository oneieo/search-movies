// API url
const apiUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

// API 요청에 사용
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWJhNTBjM2QzYmNkM2MwYTFlNTY5ODQ3MjVjOGI5YiIsInN1YiI6IjY2Mjc5YzdmNjNkOTM3MDE2NDczNjE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFMshiEk0fPnYsxW-pIEyfKvjmANU7gtPKy8-zEO-OE",
  },
};

// 영화 데이터 가져와서 화면에 보여주는 fetch 함수
const fetchShowMvlist = async () => {
  await fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      // 영화 데이터 배열
      const movies = data.results;
      // 영화 리스트 보여주는 함수
      updateMovieList(movies);
      // 카드 클릭하면 알럿으로 아이디 보여주는 함수
      clickEventToCards();      //cardPart.addEventListener("click", clickEventToCards2(event));
      // 영화 검색시, 입력창한 키워드를 포함하는 제목의 영화 카드만 띄우는 이벤트
      searchBtn.addEventListener("click", searchMovies);
    })
    .catch((err) => console.error("데이터 불러오기 중 에러 발생!"));
};

const updateMovieList = (movies) => {
  const container = document.getElementById("movie-cards");
  container.innerHTML = "";
  
  movies.forEach((movie) => {
    const title = movie.title;
    const voteAverage = movie.vote_average;
    const overview = movie.overview;
    const posterPath = movie.poster_path;
    const id = movie.id;
    
    const card = document.createElement("div");
    card.classList.add("movie_card"); // 클래스 추가
    card.id = id;
    // ul 태그 수정
    card.innerHTML = `
     <div>  
        <img src="https://image.tmdb.org/t/p/w200${posterPath}" id="poster" alt="${title}" />
        <h3>${title}</h3>
        <p id="score">★ ${voteAverage}</p>
        <p id="content">${overview}</p>               
     </div>
    `;
    container.appendChild(card);
  });
};

// 카드 클릭하면 해당 영화의 id를 알럿으로 띄우는 함수
const cardClick = (movieId) => {
  alert(`영화 id: ${movieId}`);
};

const clickEventToCards = () => {
  const cards = document.querySelectorAll(".movie_card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const movieId = card.id;
      cardClick(movieId);
    });
  });
};

// const clickEventToCards2 = (event) => {
//   const cardPart = document.getElementById("movie_cards")
//   console.log(cardPart);  // null?
//   if(event.target === cardPart) return;  // 이벤트가 발생한 요소
//   if(event.target.matches(".movie_card")) {
//     alert(`Movie Id: ${event.target.id}`);
//   } else {
//     alert(`Movie Id: ${event.target.parentNode.id}`);
//   }
// }

// 입력창 요소, 검색 버튼 가져오기
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

const searchMovies = () => {
  const keyword = searchBox.value.trim().toLowerCase();  
  const cards = document.querySelectorAll(".movie_card");
  cards.forEach((card) => {
    const titleElement = card.querySelector("h3");  //여기 두 줄 합치기
    const title = titleElement.textContent.trim().toLowerCase();

    if (title.includes(keyword)) {
      card.style.display = "block";
    } else {    
      card.style.display = "none";
    }
  });
};

searchBox.addEventListener("keyup", (e) => {
  if(e.key === 'Enter'){
    document.getElementById("searchBtn").click();
  }
})

fetchShowMvlist();


// const movieContainer = document.getElementById('movie-cards');
// let movieData = new Map();
// console.log(movieData);
// // 데이터 배열을 순회하면서 각각의 요소를 가지고 카드 만들기
// const updateMovieList = (movies) => {
  //     movies.forEach(movie => {
    //         // key가 영화 제목, value가 구성요소 객체인 맵
    //         movieData.set(movie.title, {
      //             title: movie.title,
      //             poster_path: movie.poster_path,
      //             overview: movie.overview,
      //             voteAverage: movie.vote_average,
      //         })
      //         // 카드
      //         const card = document.createElement('div');
      //         card.classList.add('movie_card');
      //         card.id = movie.id;

//         // 포스터 이미지
//         const poster = document.createElement('img');
//         poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
//         poster.alt = movie.title;

//         // 제목
//         const title = document.createElement('h3');
//         title.textContent = movie.title;
//         title.classList.add('movie_title');

//         // 평점
//         const voteAverage = document.createElement('p');
//         voteAverage.textContent = `평점: ${movie.vote_average}`;

//         // 내용 요약
//         const overview = document.createElement('p');
//         overview.textContent = movie.overview;

//         // 카드에 요소 추가
//         card.appendChild(poster);
//         card.appendChild(title);
//         card.appendChild(voteAverage);
//         card.appendChild(overview);

//         // 컨테이너에 카드 추가
//         movieContainer.appendChild(card);
//     })
// }

// // 카드 클릭하면 해당 영화의 id값을 알럿으로 보여주는 이벤트 함수 생성
// const cardClick = (movieId) => {
//     alert(`영화 id: ${movieId}`);
// }

// const clickEventToCards = () => {
//     const cards = document.querySelectorAll('.movie_card');
//     cards.forEach(card => {
//         card.addEventListener('click', () => {
//             const movieId = card.id;
//             cardClick(movieId);
//         });
//     });
// }

// // 입력창 요소, 검색 버튼 가져오기
// const searchBox = document.getElementById('searchBox');
// const searchBtn = document.getElementById('searchBtn');

//  // 키워드를 포함한 제목의 영화 카드만 보여주는 함수
// const searchMovies = () => {
//     const keyword = searchBox.value;
//     const newfiltered = new Map();

//     movieContainer.innerHTML = '';

//     movieData.forEach((movie, title) => {
//         if (title.toLowerCase().includes(keyword.toLowerCase())) {

//             const card = document.createElement('div');
//             card.classList.add('movie_card');
//             card.id = movie.id;

//             const poster = document.createElement('img');
//             poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
//             poster.alt = movie.title;

//             const title1 = document.createElement('h3');
//             title1.textContent = movie.title;
//             title1.classList.add('movie_title');

//             const voteAverage = document.createElement('p');
//             voteAverage.textContent = `평점: ${movie.voteAverage}`;

//             const overview = document.createElement('p');
//             overview.textContent = movie.overview;

//             card.appendChild(poster);
//             card.appendChild(title1);
//             card.appendChild(voteAverage);
//             card.appendChild(overview);

//             // 컨테이너에 카드 추가
//             movieContainer.appendChild(card);
//         }
//     })
//     return newfiltered;
// }

// searchBtn.addEventListener('click', () => {
//     searchMovies();
// });

// 함수 만들기 함수형프로그래밍,클래스 강의