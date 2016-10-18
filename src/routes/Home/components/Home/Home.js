import React, { Component } from 'react' // eslint-disable-line
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'

// Components
import Theme from 'theme'

import classes from './Home.scss'

export const Home = () => (
  <div className={classes['container']} style={{ color: Theme.palette.primary2Color }}>
    <Paper className={classes['hero']}>
      <span className={classes['welcome']}>
        Welcome to the
      </span>
      <div className={classes['title']}>
        <span className={classes['name']}>
          Codeword
        </span>
        <span className={classes['dashboard']}>
          Dashboard
        </span>
      </div>
      <div className={classes['instructions']}>
        <Link to='/login'>Login</Link>
        <span>Or</span>
        <Link to='/signup'>Signup</Link>
        <span>To get Started</span>
      </div>
    </Paper>
  </div>
)

export default Home
