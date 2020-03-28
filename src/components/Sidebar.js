import React, { useEffect, useState, useRef } from 'react';

import { constants } from '../constants';
import numberWithCommas from '../helper';
import menu from '../assets/menu.svg';

const Sidebar = () => {
  useEffect(() => {
    fetch(constants.allData)
      .then(res => res.json())
      .then(data => updateWorldStats(data));
  }, []);

  const [worldStats, updateWorldStats] = useState({});
  const [isSidebarOpen, changeSidebarStatus] = useState(true);
  const [activeTabs, updatetabs] = useState([true, false, false, false]);

  const refOverviewTab = useRef(null);
  const refSignsTab = useRef(null);
  const refPrecautionTab = useRef(null);
  const refCureTab = useRef(null);

  const toggleSideber = () => {
    changeSidebarStatus(!isSidebarOpen);
  };

  const selectTab = currRef => {
    refOverviewTab.current.classList.remove('is-selected-tab-b');
    refSignsTab.current.classList.remove('is-selected-tab');
    refPrecautionTab.current.classList.remove('is-selected-tab');
    refCureTab.current.classList.remove('is-selected-tab');

    if (currRef.current.innerText === 'Signs')
      updatetabs([false, true, false, false]);
    else if (currRef.current.innerText === 'Prevention')
      updatetabs([false, false, true, false]);
    else if (currRef.current.innerText === 'Cure')
      updatetabs([false, false, false, true]);
    else updatetabs([true, false, false, false]);

    if (currRef.current.innerText === 'Overview')
      currRef.current.classList.add('is-selected-tab-b');
    else currRef.current.classList.add('is-selected-tab');
  };

  return (
    <React.Fragment>
      <aside
        className={isSidebarOpen ? 'menu sidebar' : 'menu sidebar open-sidebar'}
      >
        <div className='tabs'>
          <ul>
            <li className='is-active'>
              <a>Corona Viz</a>
            </li>
            <li className='is-active'></li>
            <li className='is-active'></li>
            <li className='is-active'></li>
            {/* <li className="is-active"><a> 🌎</a></li> */}
          </ul>
        </div>

        <div className='sidebar-body'>
          <ul className='menu-list p-c-10 line-height'>
            <div className='notification is-link'>
              A small hack made to help people with the challenges of{' '}
              <strong>COVID-19.</strong>
            </div>
            <li>
              <a className='is-selected'>
                Visualize COVID-19 on planetary scale
              </a>
            </li>
            {/* <li><a>About</a></li> */}
          </ul>

          <p className='menu-label pt-10' style={{ textTransform: 'none' }}>
            Worldwide statistics around COVID-19
          </p>

          <div className='notification'>
            <span style={{ color: 'gray' }}>Cases:</span>{' '}
            <strong>{numberWithCommas(worldStats.cases)}</strong> <br />
            <span style={{ color: 'gray' }}>Deaths:</span>{' '}
            <strong>{numberWithCommas(worldStats.deaths)}</strong> <br />
            <span style={{ color: 'gray' }}>Recovered:</span>{' '}
            <strong>{numberWithCommas(worldStats.recovered)}</strong> <br />
            {/* <span style={{ color: 'gray' }}>Updated:</span> <strong>{numberWithCommas(worldStats.updated)}</strong> */}
          </div>

          <div className='card'>
            <header className='card-header br-rd-top'>
              <p
                ref={refOverviewTab}
                className='card-header-title is-selected-tab-b'
                onClick={() => selectTab(refOverviewTab)}
              >
                Overview
              </p>
            </header>
            <div className='card-content scrollable'>
              <div className='content'>
                {activeTabs[0] && (
                  <div>
                    <p className='menu-label' style={{ textTransform: 'none' }}>
                      About
                    </p>
                    Coronavirus disease (COVID-19) is an infectious disease
                    caused by a new virus. <br /> <br />
                    The disease causes respiratory illness (like the flu) with
                    symptoms such as a cough, fever, and in more severe cases,
                    difficulty breathing. You can protect yourself by washing
                    your hands frequently, avoiding touching your face, and
                    avoiding close contact (1 meter or 3 feet) with people who
                    are unwell.
                    <br />
                    <p
                      className='menu-label pb-20'
                      style={{ textTransform: 'none' }}
                    >
                      HOW IT SPREADS
                    </p>
                    Coronavirus disease spreads primarily through contact with
                    an infected person when they cough or sneeze. It also
                    spreads when a person touches a surface or object that has
                    the virus on it, then touches their eyes, nose, or mouth.
                  </div>
                )}
                {activeTabs[1] && (
                  <div>
                    People may experience:
                    <ul>
                      <li>cough</li>
                      <li>fever</li>
                      <li>tiredness</li>
                      <li>difficulty breathing (severe cases)</li>
                    </ul>
                    People may be sick with the virus for 1 to 14 days before
                    developing symptoms. The most common symptoms of coronavirus
                    disease (COVID-19) are fever, tiredness, and dry cough. Most
                    people (about 80%) recover from the disease without needing
                    special treatment.
                    <br />
                    More rarely, the disease can be serious and even fatal.
                    Older people, and people with other medical conditions (such
                    as asthma, diabetes, or heart disease), may be more
                    vulnerable to becoming severely ill.
                  </div>
                )}
                {activeTabs[2] && (
                  <div>
                    <img
                      src='https://user-images.githubusercontent.com/32517802/77585577-b4173f80-6f0a-11ea-96e6-35e0b3b93e8a.png'
                      alt='take precautions'
                    />
                    You can protect yourself and help prevent spreading the
                    virus to others if you: <br />
                    <p className='menu-label' style={{ textTransform: 'none' }}>
                      Do
                    </p>
                    <ul>
                      <li>
                        Wash your hands regularly for 20 seconds, with soap and
                        water or alcohol-based hand rub
                      </li>
                      <li>
                        Cover your nose and mouth with a disposable tissue or
                        flexed elbow when you cough or sneeze
                      </li>
                      <li>
                        Avoid close contact (1 meter or 3 feet) with people who
                        are unwell{' '}
                      </li>
                      <li>
                        Stay home and self-isolate from others in the household
                        if you feel unwell{' '}
                      </li>
                    </ul>
                    <br />
                    <p className='menu-label' style={{ textTransform: 'none' }}>
                      Don't
                    </p>
                    <ul>
                      <li>
                        Touch your eyes, nose, or mouth if your hands are not
                        clean
                      </li>
                      <li>Go out, if not necessary.</li>
                    </ul>
                  </div>
                )}
                {activeTabs[3] && (
                  <div>
                    <blockquote>
                      There is no specific medicine to prevent or treat
                      coronavirus disease (COVID-19). People may need supportive
                      care to help them breathe.
                    </blockquote>
                    <p className='menu-label' style={{ textTransform: 'none' }}>
                      Self-Care
                    </p>
                    If you have mild symptoms, stay at home until you’ve
                    recovered. You can relieve your symptoms if you: <br />
                    <ul>
                      <li>rest and sleep</li>
                      <li>keep warm</li>
                      <li>drink plenty of liquids</li>
                      <li>
                        use a room humidifier or take a hot shower to help ease
                        a sore throat and cough
                      </li>
                    </ul>
                    <p className='menu-label' style={{ textTransform: 'none' }}>
                      Medical
                    </p>
                    If you develop a fever, cough, and have difficulty
                    breathing, promptly seek medical care. Call in advance and
                    tell your health provider of any recent travel or recent
                    contact with travelers.
                  </div>
                )}
              </div>
            </div>
            <footer className='card-header br-rd-btm'>
              <p
                ref={refSignsTab}
                className='card-header-title'
                onClick={() => selectTab(refSignsTab)}
              >
                Signs
              </p>
              <p
                ref={refPrecautionTab}
                className='card-header-title'
                onClick={() => selectTab(refPrecautionTab)}
              >
                Prevention
              </p>
              <p
                ref={refCureTab}
                className='card-header-title'
                onClick={() => selectTab(refCureTab)}
              >
                Cure
              </p>
            </footer>
          </div>

          <p
            className='menu-label bottom pb-20'
            style={{ textTransform: 'none', textAlign: 'center' }}
          >
            Developed by{' '}
            <span>
              <a
                className='dhruv10'
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/dhruv10'
              >
                dhruv10
              </a>
            </span>
            {' '}on{' '}
            <span>
              <a
                className='dhruv10'
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/dhruv10/coronaviz'
              >
                GitHub
              </a>
            </span>
          </p>
        </div>
      </aside>
      <abbr title='Menu'>
        <button className='button menu-icon' onClick={() => toggleSideber()}>
          <img src={menu} width='64px' style={{ transform: 'scale(1.5)' }} />
        </button>
      </abbr>
    </React.Fragment>
  );
};

export default Sidebar;
