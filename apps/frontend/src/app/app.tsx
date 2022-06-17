import { Route, Routes } from 'react-router';
import BaseLayout from './Pages/BaseLayout';
import BranchMembers from './Pages/BranchMembers';
import BranchOffice from './Pages/BranchOffice';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/users" element={<BranchMembers />} />
        <Route index element={<BranchOffice />} />
      </Route>
    </Routes>
  );
}

export default App;
