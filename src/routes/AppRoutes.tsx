// src/routes/AppRoutes.tsx
//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Inicial from '../pages/Inicial';
import Primaria from '../pages/Primaria';
import Secundaria from '../pages/Secundaria';
import CicloVacacional from '../pages/CicloVacacional';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inicial" element={<Inicial />} />
      <Route path="/primaria" element={<Primaria />} />
      <Route path="/secundaria" element={<Secundaria />} />
      <Route path="/ciclo-vacacional" element={<CicloVacacional />} />
    </Routes>
  );
};

export default AppRoutes;