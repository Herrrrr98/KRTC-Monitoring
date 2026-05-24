import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../theme.css';
import styles from './app.module.css'
import { RightContainer } from '../components/RightContainer';
import { LeftContainer } from '../components/LeftContainer';

export default function MainView() {
  return (
    <div className={styles.body}>
      <LeftContainer />
      <RightContainer />
    </div>
  )
}
