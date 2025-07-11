import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar';
import Card from './Components/Card'

//temp
const tmp_url = "https://www.amazon.ca/Duracell-Coppertop-Long-Lasting-Eco-Friendly-Boyeb/dp/B0B1DF9NVJ?ref_=pd_ci_mcx_mh_pe_im_d1_hxwPPE_sspa_dk_det_cao_p_0_1&pd_rd_i=B0B1DF9NVJ&pd_rd_w=zrrGb&content-id=amzn1.sym.77f0615e-71ca-489d-bc3c-c94163b77e48&pf_rd_p=77f0615e-71ca-489d-bc3c-c94163b77e48&pf_rd_r=3QBA8KCYF8YS8MZSCVVM&pd_rd_wg=tvyWK&pd_rd_r=a721d495-d5f4-4fc5-86a4-2fad556bbe25&th=1"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Test</p>
        <SearchBar />
        <Card url={tmp_url} />
      </header>
      
    </div>
  );
}

export default App;
