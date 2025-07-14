"use client";

import { Card, Authenticator, Tabs, TabItem, SliderField, Expander, ExpanderItem, StepperField, SelectField, Button, Divider, SwitchField } from '@aws-amplify/ui-react'
import React, {useState} from 'react'
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut, Line } from 'react-chartjs-2';
import IntegerInput from '../components/integerInput';

Chart.register(CategoryScale);

const Calculator: React.FC = () => {

  const [apiData, setApiData] = useState([]);
  const [prod, setProd] = useState('IUL');
  const [sex, setSex] = useState('M');
  const [smoker, setSmoker] = useState('N');
  
  const [deathBenefitOption, setDeathBenefitOption] = useState('1');
  const [switchYr, setSwitchYr] = useState('99');
  const [indexCap, setIndexCap] = useState('8.5');
  const [indexPar, setIndexPar] = useState('1');
  const [pres, setPres] = useState('NB');
  const [ROR, setROR] = useState('5.75');
  const [distAmt, setDistAmt] = useState('0');
  const [distStart, setDistStart] = useState('30');
  const [distEnd, setDistEnd] = useState('45');

  const [LE, setLE] = useState('85')
  const [numScen, setNumScen] = useState('250')

  const [calcOutputAge, setCalcOutputAge] = useState([])
  const [calcOutputPrem, setCalcOutputPrem] = useState([])
  const [calcOutputDur, setCalcOutputDur] = useState([])
  const [calcOutputAV, setCalcOutputAV] = useState([])

  const [CalcOutputPctPrem, setCalcOutputPctPrem] = useState([])
  const [CalcOutputPerPol, setCalcOutputPerPol] = useState([])
  const [CalcOutputPerUnit, setCalcOutputPerUnit] = useState([])
  const [CalcOutputCOI, setCalcOutputCOI] = useState([])
  const [CalcOutputPolCred, setCalcOutputPolCred] = useState([])
  const [CalcOutputPersBonus, setCalcOutputPersBonus] = useState([])

  const [LE_Age, setLE_Age] = useState('')
  const [LE_Lapse, setLE_Lapse] = useState('')
  const [LE_Persist, setLE_Persist] = useState('')
  const [LE_AV, setLE_AV] = useState('')
  const [LE_DB, setLE_DB] = useState('')
  const [LE_Prob, setLE_Prob] = useState('')
  const [LE5_Age, setLE5_Age] = useState('')
  const [LE5_Lapse, setLE5_Lapse] = useState('')
  const [LE5_Persist, setLE5_Persist] = useState('')
  const [LE5_AV, setLE5_AV] = useState('')
  const [LE5_DB, setLE5_DB] = useState('')
  const [LE5_Prob, setLE5_Prob] = useState('')
  const [LE10_Age, setLE10_Age] = useState('')
  const [LE10_Lapse, setLE10_Lapse] = useState('')
  const [LE10_Persist, setLE10_Persist] = useState('')
  const [LE10_AV, setLE10_AV] = useState('')
  const [LE10_DB, setLE10_DB] = useState('')
  const [LE10_Prob, setLE10_Prob] = useState('')
  const [SuccessVector, setSuccessVector] = useState([]) 
  const [SurvivalVector, setSurvivalVector] = useState([]) 

  const [tabIndex, setTabIndex] = useState(0);

  const [pr, setPr] = useState(24000);
  const [pn, setPn] = useState(10);
  const [fa, setFa] = useState(1000000);
  const [age, setAge] = useState(45);

  const handlePrChg = (newValue) => {setPr(newValue)}
  const handlePnChg = (newValue) => {setPn(newValue)}
  const handleFaChg = (newValue) => {setFa(newValue)}
  const handleAgeChg = (newValue) => {setAge(newValue)}

  const [pprFactor, setPprFactor] = useState(50)
  const [ppFactor, setPpFactor] = useState(50)
  const [unitFactor, setUnitFactor] = useState(50)
  const [coiFactor, setCoiFactor] = useState(50)
  const [pbFactor, setPbFactor] = useState(50)

  const [calcOutputLapseRate,setCalcOutputLapseRate] = useState(0.5)
  const [calcOutputSuccessRate,setCalcOutputSuccessRate] = useState(0.5)

  const chartLabels = calcOutputAge;

  var chartData = {
    labels: chartLabels,
    datasets: [
      {
      label: "Baseline Account Value",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: calcOutputAV,
      },
    ],
  };

  var probData = {
    labels: [
      'Sustain',
      'Lapse',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [calcOutputSuccessRate, calcOutputLapseRate],
      backgroundColor: [
      'rgb(54, 162, 235)',
      'rgb(255, 99, 132)'
      ],
      hoverOffset: 4
    }]
  };

  var lineData = {
    labels: calcOutputAge,
    datasets: [
      {
        label: 'Policy inforce probability',
        data: SuccessVector,
        backgroundColor: [
          'rgb(255, 99, 132)'
        ],
        fill: false
      },  
      {
      label: 'Cumulative claim probability',
      data: SurvivalVector,
      backgroundColor: [
        'rgb(54, 162, 235)'
      ],
      fill: false
      }
    ],
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Attained Age'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Probability'
          }
        }
      }
    }
  }

  const formatNumber = (value) => {
  // Remove existing commas
    value = value.replace(/,/g, '');
    // Add commas as appropriate
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  async function baseline() {
    // log request

    try {
      const response = await fetch('https://kqp9cq57bi.execute-api.us-west-2.amazonaws.com/alpha/',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(
          {
            "age":age,
            "sex":sex,
            "riskClass":smoker,
            "presType": "NB",
            "prodType": prod,
            "premAmt":pr,
            "premNum":pn,
            "face":fa,
            "dbo":1,
            "dboSwitch":999,
            "ROR":ROR/100,
            "indexCap":indexCap/100,
            "indexPar":indexPar,
            "distAmt": distAmt,
            "distStart": distStart,
            "distEnd": distEnd,
            "COIFactor":coiFactor,
            "UnitFactor":unitFactor,
            "PerPolFactor":ppFactor,
            "PctPremFactor":pprFactor,
            "bonusFactor":pbFactor,
          }
        )
      })
      var result = await response.json()
      setCalcOutputDur(result.body.dur)
      setCalcOutputAge(result.body.age)
      setCalcOutputPrem(result.body.prem)
      setCalcOutputAV(result.body.av)
      setCalcOutputPctPrem(result.body.pctprem)
      setCalcOutputPerPol(result.body.perpol)
      setCalcOutputPerUnit(result.body.perunit)
      setCalcOutputCOI(result.body.coi)
      setCalcOutputPolCred(result.body.polcred)
      setCalcOutputPersBonus(result.body.persbonus)
    } catch (error) {
      console.error("Error:", error);
    }
    setTabIndex(1)
  }

  async function runIllumine() {
    try {
      const response = await fetch('https://kqp9cq57bi.execute-api.us-west-2.amazonaws.com/alpha/multi/',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(
          {
            "age":age,
            "sex":sex,
            "riskClass":smoker,
            "presType": "NB",
            "prodType": prod,
            "premAmt":pr,
            "premNum":pn,
            "face":fa,
            "dbo":1,
            "dboSwitch":999,
            "ROR":ROR/100,
            "indexCap":indexCap/100,
            "indexPar":1,
            "distAmt": 0,
            "distStart": 20,
            "distEnd": 50,
            "COIFactor":coiFactor,
            "UnitFactor":unitFactor,
            "PerPolFactor":ppFactor,
            "PctPremFactor":pprFactor,
            "bonusFactor":pbFactor,
            "numScen": numScen,
            "LE": LE
          }
        )
      })
      var result = await response.json()
      setCalcOutputLapseRate(result.body.lapse)
      setCalcOutputSuccessRate(result.body.success)
      setLE_Age(result.body.LE_Age)
      setLE_Lapse(result.body.LE_Lapse)
      setLE_Persist(result.body.LE_Persist)
      setLE_AV(result.body.LE_AV)
      setLE_DB(result.body.LE_DB)
      setLE_Prob(result.body.LE_Prob)
      setLE5_Age(result.body.LE5_Age)
      setLE5_Lapse(result.body.LE5_Lapse)
      setLE5_Persist(result.body.LE5_Persist)
      setLE5_AV(result.body.LE5_AV)
      setLE5_DB(result.body.LE5_DB)
      setLE5_Prob(result.body.LE5_Prob)
      setLE10_Age(result.body.LE10_Age)
      setLE10_Lapse(result.body.LE10_Lapse)
      setLE10_Persist(result.body.LE10_Persist)
      setLE10_AV(result.body.LE10_AV)
      setLE10_DB(result.body.LE10_DB)
      setLE10_Prob(result.body.LE10_Prob)
      setSuccessVector(result.body.SuccessVector)
      setSurvivalVector(result.body.SurvivalVector)
    } catch (error) {
      console.error("Error:", error);
    }
    setTabIndex(3)
  }

  async function showOptions() {
    setTabIndex(2)
  }

  return (
    <>
    <h1>Illumine Probability Calculator</h1>
    <div> 
      <div>
        <p style={{fontSize: "1.5rem"}}>Start your report by entering basic policy information.</p>

        <div style={{display:"flex"}}>
          <label>New Business</label>
            <input
            type="radio"
            name="PresentationType"
            value="NB"
            checked={pres === "NB"}
            onChange={(e) => setPres(e.target.value)}
            />
          <div>
            <p style={{marginBottom:"0", textAlign:"center"}}><strong>Insured</strong></p>
            <Divider style={{marginBottom:"10px"}}/>
            <div style={{display:"flex"}}>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <RadioGroupField label="Insured Sex" name="InsuredSex" value={sex} onChange={(e) => setSex(e.target.value)}>
                  <Radio value="M">Male</Radio>
                  <Radio value="F">Female</Radio>
                </RadioGroupField>
              </Card>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated"> 
                <label>Current Age</label>   
                <IntegerInput
                min={20}
                max={80}
                value={age}
                onChange={handleAgeChg}
                />     
              </Card>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">         
                <RadioGroupField  label="Tobacco Use" name="InsuredSm" value={smoker} onChange={(e) => setSmoker(e.target.value)}>
                  <Radio value="N">No Tobacco</Radio>
                  <Radio value="T">Uses Tobacco</Radio>
                </RadioGroupField>
              </Card>
            </div>
            <p style={{marginBottom:"0",textAlign:"center"}}><strong>Product</strong></p>
            <Divider style={{marginBottom:"10px"}}/>
            <div style={{ display:"flex"}}>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <RadioGroupField label="Product Type" name="ProductType" value={prod} onChange={(e) => setProd(e.target.value)}>
                  <Radio value="IUL">Indexed</Radio>
                  <Radio value="VUL">Variable</Radio>
                </RadioGroupField>
              </Card>
            </div>
            <p style={{marginBottom:"0", textAlign:"center"}}><strong>Premium</strong></p>
            <Divider style={{marginBottom:"10px"}}/>
            <div style={{ display: "flex"}}>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <StepperField
                  label="Annual Premium"
                  min={0}
                  step={1000}
                  value={pr}
                  onStepChange={handlePrChg}
                  />
              </Card>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <label>Number of Premiums</label>
                <IntegerInput
                  min={0}
                  max={200}
                  value={pn}
                  onChange={handlePnChg}
                  />  
              </Card>
            </div>

            <p style={{marginBottom:"0", textAlign:"center"}}><strong>Benefit</strong></p>
            <Divider style={{marginBottom:"10px"}} />
            <div style={{ display: "flex"}}>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <StepperField
                  label="Face Amount"
                  min={0}
                  step={1000000}
                  value={fa}
                  onStepChange={handleFaChg}
                  />
              </Card>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <SelectField
                  label="Death Benefit Option"
                  value={deathBenefitOption}
                  onChange={(e) => setDeathBenefitOption(e.target.value)}>
                  <option value="1">Level</option>
                  <option value="2">Increasing</option>
                </SelectField>
              </Card>
              
              {deathBenefitOption === "1" ? null :(
                <>
                <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                  <label>DBO Switch Year</label>
                  <input name="switchYr" value={switchYr} onChange={(e) => setSwitchYr(e.target.value)} /> 
                </Card>
                </>
              )}

              <Card style={{width:"310px", margin:"10px"}} variation="elevated"> 
                <label>NLG Duration</label>   
                <IntegerInput
                min={0}
                max={100}
                value={0}
                onChange={0}
                />     
              </Card>

            </div>

            <p style={{marginBottom:"0", textAlign:"center"}}><strong>Account Allocation</strong></p>
            <Divider  style={{marginBottom:"10px"}}/>
            <div style={{display:"flex"}}>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <label>Baseline Rate of Return (%)</label>
                <input name="ROR" value={ROR} onChange={(e) => setROR(e.target.value)} />
              </Card>

              {prod === "VUL" ? null : (
                <>
                <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                  <label>Index Account Cap</label>
                  <input name="indexCap" value={indexCap} onChange={(e) => setIndexCap(e.target.value)} />
                </Card>
                <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                  <label>Index Account Par</label>
                  <input name="indexPar" value={indexPar} onChange={(e) => setIndexPar(e.target.value)} />
                </Card>
                </>
              )}
            </div>

            <p style={{marginBottom:"0", textAlign:"center"}}><strong>Distributions</strong></p>
            <Divider  style={{marginBottom:"10px"}}/>

            <div style={{ display: "flex"}}>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <label>Distribution Amount</label>
                <input name="distAmt" value={distAmt} onChange={(e) => setDistAmt(formatNumber(e.target.value))} /> 
              </Card>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <label>Distribution Start Year</label>
              <IntegerInput
                  min={0}
                  max={120}
                  value={distStart}
                  onChange={(e) => setDistStart(e.target.value)}
                  />  
              </Card>
              <Card style={{width:"310px", margin:"10px"}} variation="elevated">
                <label>Distribution End Year</label>
                <IntegerInput
                  min={0}
                  max={120}
                  value={distEnd}
                  onChange={(e) => setDistEnd(e.target.value)}
                  />
              </Card>
            </div>
          </div>

          <div style={{display:"block", marignLeft:"auto", marignRight:"auto"}}>
            <Button  onClick={baseline}>Run Baseline</Button>
          </div>

        </div>

        <div id="baseline">
          {calcOutputAV.length === 0 ? (
            <Button onClick={baseline}>Run Baseline</Button>
          ) : null}

          <p style={{fontSize: "1.5rem"}}>Here's the baseline illustration produced by the Illumine model. You can customize the charges before continuing to the report.</p>
          
          <div style={{display: "block", marginLeft:"auto", marginRight:"auto"}} className="avChart">
            <Line data={chartData} />
          </div>
          <div style={{display: "block", marginLeft:"auto", marginRight:"auto"}}>
            <table style={{}}>
              <thead>
                <tr>
                  <th>duration</th>
                  <th>EOY age</th>
                  <th>premium</th>
                  <th>Percent Prem</th>
                  <th>Per Pol</th>
                  <th>Per Unit</th>
                  <th>COI</th>
                  <th>Policy Credit</th>
                  <th>Persistency Bonus</th>
                  <th>Account Value</th>
                </tr>
              </thead>
              <tbody>
                {calcOutputDur.map((item, i) => (
                  <tr key={item}>
                    <td>{item}</td>
                    <td>{calcOutputAge[i]}</td>
                    <td>{calcOutputPrem[i].toLocaleString()}</td>
                    <td>{CalcOutputPctPrem[i].toLocaleString()}</td>
                    <td>{CalcOutputPerPol[i].toLocaleString()}</td>
                    <td>{CalcOutputPerUnit[i].toLocaleString()}</td>
                    <td>{CalcOutputCOI[i].toLocaleString()}</td>
                    <td>{CalcOutputPolCred[i].toLocaleString()}</td>
                    <td>{CalcOutputPersBonus[i].toLocaleString()}</td>
                    <td>{calcOutputAV[i].toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{position:"fixed", bottom:"0px", width:"500px", backgroundColor:"whitesmoke"}}>
            <SliderField label="Premium Based Charges" value={pprFactor} onChange={setPprFactor} isValueHidden/>
            <SliderField label="Per Policy" max={100} value={ppFactor} onChange={setPpFactor} isValueHidden/>
            <SliderField label="Unit Based Charges" max={100} value={unitFactor} onChange={setUnitFactor} isValueHidden/>
            <SliderField label="Cost of Insurance Charges" max={100} value={coiFactor} onChange={setCoiFactor} isValueHidden/>
            <SliderField label="Peristency Bonus" max={100} value={pbFactor} onChange={setPbFactor}  isValueHidden/>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <Button onClick={baseline}>Recalculate Baseline</Button>
              <Button onClick={showOptions}>Set Report Options</Button>
            </div>
          </div>

          <Button onClick={showOptions}>Set Report Options</Button>
        </div>

        <div id="options">
          <p style={{fontSize: "1.5rem"}}>Set customization options for your Illumine Report</p>
          <Card style={{marginTop:"20px", maxWidth:"400px"}} variation="elevated">
            <label>Report Target Age</label>
            <IntegerInput value={LE} onChange={setLE} min={80} max={110} />
          </Card>
          <Card style={{marginTop:"20px", maxWidth:"400px"}} variation="elevated">  
            <label>Number of Scenarios</label>
            <IntegerInput value={numScen} onChange={setNumScen} min={100} max={2000} />
          </Card>
          <Button onClick={runIllumine}>run illumine analysis</Button>
        </div>

        <div id="results">
          <Card variation="elevated">
            <Button onClick={runIllumine} >Refresh</Button>
            <h2>Illumine Report</h2>
            <table>
              <thead>
                <tr>
                  <td></td>
                  <th>Age</th>
                  <th>Sustain %</th>
                  <th>Lapse %</th>
                  <th>Survival %</th>
                  <th>Average AV</th>
                  <th>Average DB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Target Age</td>
                  <td>{LE_Age}</td>
                  <td>{LE_Persist}</td>
                  <td>{LE_Lapse}</td>
                  <td>{LE_Prob}</td>
                  <td>{LE_AV.toLocaleString()}</td>
                  <td>{LE_DB.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Target Age + 5 years</td>
                  <td>{LE5_Age}</td>
                  <td>{LE5_Persist}</td>
                  <td>{LE5_Lapse}</td>
                  <td>{LE5_Prob}</td>
                  <td>{LE5_AV.toLocaleString()}</td>
                  <td>{LE5_DB.toLocaleString()}</td>            
                </tr>
                <tr>
                  <td>TargetAge + 10 years</td>
                  <td>{LE10_Age}</td>
                  <td>{LE10_Persist}</td>
                  <td>{LE10_Lapse}</td>
                  <td>{LE10_Prob}</td>
                  <td>{LE10_AV.toLocaleString()}</td>
                  <td>{LE10_DB.toLocaleString()}</td>  
                </tr>
              </tbody>
            </table>

            <div className="avChart">
              <Doughnut data={probData} />
            </div>
            <p>How long will your policy last?</p>
            <div className="avChart">
              <Line data={lineData}/>
            </div>
            <Button onClick={runIllumine} >Refresh</Button>
          </Card>
        </div>
      </div>
    </div>

    <p className="Release"> Beta Release v0.0.10</p>
    </>
  )}

export default Calculator;