import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import  HomePage from './HomePage'
import  NutrientsPage from './NutrientsPage'
import  RecipiesPage from './RecipiesPage'
import  ContactsPage from './ContactsPage'

const Navbar = ()  => {

  return(
    <div>
      <header>
        <div className="container_12 pb-200">
          <div className="grid_12">
            <div className="title">
              Nutritious Food
            </div>
            <div className="menu_block">
              <Router>
                <div>
                  <ul  className="sf-menu">
                    <li>
                      <Link exact to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/nutrients">Nutrients</Link>
                    </li>
                    <li>
                      <Link to="/recipies">Recipies</Link>
                    </li>
                    <li>
                      <Link to="/contacts">Contacts</Link>
                    </li>
                  </ul>
                  <Switch>
                    <Route exact path="/">
                      <HomePage />
                    </Route>
                    <Route path="/nutrients">
                      <NutrientsPage />
                    </Route>
                    <Route path="/recipies">
                      <RecipiesPage />
                    </Route>
                    <Route path="/contacts">
                      <ContactsPage />
                    </Route>
                  </Switch>
                </div>
              </Router>
              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </header>
    </div>
  )
}

export  default Navbar