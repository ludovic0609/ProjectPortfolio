import React from 'react';
import ReactDOM from 'react-dom/client';

//import des styles css
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

//Import des Components pour afficher en fonction des routes
import Home from "./Components/Home";
import Login from './Components/Login';

import HomeAdmin from './Components/Admin/Home';
import CategoryAdmin from './Components/Admin/Category';

import AddCategorySkill from './Components/Admin/AddCategorySkill';
import AddCategoryProject from './Components/Admin/AddCategoryProject';
import AddEducation from './Components/Admin/AddEducation';
import AddWorkExperience from './Components/Admin/AddWorkExperience';
import AddSkill from './Components/Admin/AddSkill';
import AddProject from './Components/Admin/AddProject';

import EditCategorySkill from './Components/Admin/EditCategorySkill';
import EditCategoryProject from './Components/Admin/EditCategoryProject';
import EditEducation from './Components/Admin/EditEducation';
import EditWorkExperience from './Components/Admin/EditWorkExperience';
import EditSkill from './Components/Admin/EditSkill';
import EditProject from './Components/Admin/EditProject';
import EditProfil from './Components/Admin/EditProfil';

import reportWebVitals from './reportWebVitals';

//import pour le routage
import { BrowserRouter,Routes,Route } from 'react-router-dom';

//import de redux pour le reducer
import { createStore } from 'redux';
import reducer from './reducers/reduce';
import { Provider } from 'react-redux';

// création du store => prêt pour l'app
const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()) ) ;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/login" element={<Login />} /> 
              <Route path="/admin" element={<HomeAdmin />} /> 
              <Route path="/admin/category" element={<CategoryAdmin />} /> 

              <Route path="/admin/add/skill/category" element={<AddCategorySkill />} /> 
              <Route path="/admin/add/project/category" element={<AddCategoryProject />} /> 
              <Route path="/admin/add/education" element={<AddEducation />} /> 
              <Route path="/admin/add/workexperience" element={<AddWorkExperience />} /> 
              <Route path="/admin/add/skill" element={<AddSkill />} /> 
              <Route path="/admin/add/project" element={<AddProject />} /> 

              <Route path="/admin/edit/skill/category/:id" element={<EditCategorySkill />} />
              <Route path="/admin/edit/project/category/:id" element={<EditCategoryProject />} />
              <Route path="/admin/edit/education/:id" element={<EditEducation />} />
              <Route path="/admin/edit/workexperience/:id" element={<EditWorkExperience />} />
              <Route path="/admin/edit/skill/:id" element={<EditSkill />} />
              <Route path="/admin/edit/project/:id" element={<EditProject />} />
              <Route path="/admin/edit/profil/:id" element={<EditProfil />} />
            </Routes>
          </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
