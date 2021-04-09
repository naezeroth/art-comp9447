/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  //Authentication endpoints
  '/api/auth/logout':                           {action: 'auth/logout'},
  'POST /api/auth/register':                    {action: 'auth/register'},
  'POST /api/auth/login':                       {action: 'auth/login'},

  //Alert endpoints
  '/api/alert':                                 {action: 'alert/index'},

  //Flow endpoints
  '/api/create-flow':                           {action: 'flow/create-flow'},
  'GET /api/display-flows':                          {action: 'flow/display-flows'},

  //Sample endpoints
  'GET /public':                                {action: 'public'},
  'GET /private':                               {action: 'private'},

  '/api/edit-flow':                             {action: 'flow/edit-flow'},
  

};
