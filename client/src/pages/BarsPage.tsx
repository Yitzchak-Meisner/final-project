import { Outlet, Link } from 'react-router-dom';

const Bars = () => {
  return (
    <div style={{ paddingTop: '100px' }}>
      <h1>Bars Section</h1>
      <nav>
        <Link to='/categories/floor-bar'>בר ריצפתי</Link>
        <Link to='/categories/table-bar'>בר שולחני</Link>
      </nav>
      {/* <Outlet /> */}
    </div>
  )
}

export default Bars;
