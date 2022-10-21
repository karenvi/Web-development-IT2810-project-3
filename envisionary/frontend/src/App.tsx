import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { searchQueryState, testRecoilState } from './states/states';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import Header from './components/Header/Header';
import Feed from './pages/Feed'
import Country from './pages/Country'
import { useQuery, gql } from '@apollo/client';
import Search from './components/Search';

// APOLLO CLIENT:
// const GET_BOOKS = gql`
//   query GetBooks {
//     countries {
//       Country
//     }
//   }
// `;

// function DisplayLocations() {
//   const { loading, error, data } = useQuery(GET_BOOKS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.books.map(({ title, author }: {title: string, author: string}) => (
//       <div>
//       <h3>{title}</h3>
//       <br />
//       <b>Author: </b>
//       <p>{author}</p>
//       </div>
//   ));
// }

function App() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  // const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const posts = [
    { id: '1', name: 'This first post is about React' },
    { id: '2', name: 'This next post is about Preact' },
    { id: '3', name: 'We have yet another React post!' },
    { id: '4', name: 'This is the fourth and final post' },
  ];

  const filterPosts = (posts: any, query: String | null) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post: any) => {
      const postName = post.name.toLowerCase();
      return postName.includes(query);
    })
  }

  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/country' element={<Country/>}/>
          
        </Routes>
      </Router>
      <Search />
      <ul>
        {filterPosts(posts, query).map((post: any) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
      {/* <DisplayLocations /> */}
    </div>
  );
}

export default App;
