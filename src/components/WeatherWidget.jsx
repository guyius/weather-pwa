
import React from 'react';
import classnames from 'classnames';
import './WeatherWidget.css';

export const WeatherWidget = ({data, index}) => {
  const {main, weather, name} = data;
  const colors = ['green', 'blue', 'purple', 'yellow', 'red', 'pink'];
  const iconPath = process.env.PUBLIC_URL + '/icons/';

  return (
    <section className={classnames('widget', colors[index])}>                  
      <img src={`${iconPath}${weather[0].id}.svg`} alt="weather-status" />
      <h4 className="Widget-title">{`${name} / ${ Math.round(main.temp)}`}&deg;</h4>
    </section>
  );
}