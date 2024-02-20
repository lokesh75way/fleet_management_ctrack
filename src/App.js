import { lazy, useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';

import { isAuthenticated } from './store/selectors/AuthSelectors';

import "./css/style.css";
import BasicLayout from './jsx/layouts/BasicLayout';
import AdminRoutes from './jsx/AdminRoutes';
import CompanyRoutes from './jsx/CompanyRoutes';



const SignUp = lazy(() => import('./jsx/pages/Registration'));
const Login = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}



function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = localStorage.getItem('role');

  useEffect(() => {
    checkAutoLogin(dispatch, navigate);
  }, []);



  if (props.isAuthenticated) {
    console.log(role);
    return role === 'admin' ? <AdminRoutes /> : <CompanyRoutes />
  }

  return (
    <div className="vh-100">
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/page-register' element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};


export default withRouter(connect(mapStateToProps)(App));

