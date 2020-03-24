import React from 'react';

const Navbar = () => {
  return (
    <React.Fragment>
      <aside class="menu sidebar">
        <div class="tabs">
          <ul>
            <li class="is-active"><a>Corona Viz</a></li>
            <li class="is-active"></li>
            <li class="is-active"></li>
            <li class="is-active"></li>
            {/* <li class="is-active"><a> 🌎</a></li> */}
          </ul>
        </div>
        
        <ul class="menu-list bottom">
        <p class="menu-label" style={{ textTransform: 'none', width: '150px' }}>
          Made with &hearts; by <span><a class="dhruv10" target="_blank" rel="noopener" href="https://github.com/dhruv10">dhruv10</a></span>
        </p>
          {/* <li><a class="is-active">Corona Viz</a></li>
          <li><a>Corona Viz</a></li> */}
        </ul>
      </aside>
    </React.Fragment>
  );
};

export default Navbar;
