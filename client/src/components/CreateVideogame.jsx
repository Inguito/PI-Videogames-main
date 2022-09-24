import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllVideogames, createVideogame, getAllPlatforms } from '../actions'
import styles from './CreateVideogame.module.css'
export default function CreateVideogame() {
  const dispatch = useDispatch()
  const history = useHistory()
//  const videogames = useSelector((state) => state.allVideogames)
  const genres = useSelector((state) => state.genres)
  const platforms = useSelector((state) => state.platforms)

  const [details, setDetails] = useState({
    name: '',
    description: '',
    released: '',
    createdInDb: true,
    rating:'',
    genres: [],
    platforms: []
  })

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllPlatforms());
  }, [dispatch])

//=>{dispatch(getAllPlatforms())}

  function handleChange(e) {
  //  released = released.toString()    
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    })
  }

  function handleSelectGenres(e) {
    setDetails({
      ...details,
      genres: [...details.genres, e.target.value],
    })
  }
  function handleSelectPlatforms(e) {
    setDetails({
      ...details,
      platforms: [...details.platforms, e.target.value]
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(createVideogame(details))
    setDetails({
      name: '',
      description: '',
      released: '',
      createdInDb: true,
      rating: '',
      genres: [],
      platforms: []

    })
    history.push('./videogame')
    alert('Videogame created!')
  }
  //console.log(genres);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className={styles.title}>Add New Videogame</h1>
          <div className={styles.formSection}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              className={styles.input}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='description'>
              Description:
            </label>
            <input
              type='text'
              id='description'
              name='description'
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='genres'>
              Genre:
            </label>
            <select
              className={styles.input}
              name='genres'
              onChange={(e) => handleSelectGenres(e)}
              //onChange={(e) => handleChange(e)}
              required
            >
              <option value=''>Genres...</option>
              
               {genres.map((g) => (
                // <option value={c.id}>{c.name}</option>
                <option value={g.id} key={g.id}>{g.name}</option>
          
              ))}
            </select>
          </div>
          <ul>
            <li>{details.genres.map((c) => `${c} | `)}</li>
          </ul>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='released'>
              Description:
            </label>
            <input
              type='text' placeholder='aaaa-mm-dd'
              id='released'
              name='released'
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
          </div>
          
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='rating'>
              Rating:
            </label>
            <input
              type='number'
              id='rating'
              name='rating'
              autoComplete='off'
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='platforms'>
              Platforms:
            </label>
            <select
              className={styles.input}
              name='platforms'
              onChange={(e) => handleSelectPlatforms(e)}
              required
            >
              <option value=''>Platforms...</option>
              
               {platforms.map((c) => (
                // <option value={c.id}>{c.name}</option>
                <option value={c.name} key={c.id}>{c.name}</option>

              ))}
            </select>
          </div>
          <ul>
            <li>{details.platforms.map((c) => `${c} | `)}</li>
          </ul>

          <Link to='/videogame'>
            <button className={styles.btnBack}>Go back</button>
          </Link>
          <button className={styles.btn} type='submit'>
            Add Videogame
          </button>
        </form>
      </div>
    </div>
  )
}
