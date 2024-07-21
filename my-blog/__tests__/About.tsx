import '@testing-library/jest-dom';

import About from '../src/views/components/pages/About';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';

jest.mock('../src/views/components/pages/About', () => ()  => <div>Mocked Copyright Component</div>);

