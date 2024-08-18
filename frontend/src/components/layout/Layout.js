import Header from '../Header/Header';

const Layout = (props) => {
  return (
    <div className="layout">
       
         <div className="container">
            <div>{props.children}</div>
      </div>
    </div>
  );
};
export default Layout;