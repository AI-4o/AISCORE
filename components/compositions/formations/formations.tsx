'use client';

import React, { useState, useEffect } from 'react';
import FormationsField from './formations-field';
import { FavoriteFixture } from '@/app/api/api-football/models/footballModels';

export default function Formations({fixture}: {fixture: FavoriteFixture}) {
  
  return <div>
    <FormationsField f={fixture} />
  </div>;
  }
