import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  CircularProgress,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  FitnessCenter,
  Restaurant,
  Hotel,
  CheckCircle,
  Timeline,
  Add,
  Save,
  Person,
  LocalHospital,
  Favorite,
  Psychology,
  EmojiEvents
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const HealthDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [healthData, setHealthData] = useState({
    calories: 2000,
    exercise: 30,
    sleep: 7.5,
    weight: 70,
    steps: 8000
  });
  const [healthRisk, setHealthRisk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    age: 30,
    gender: 'Male',
    height: 175,
    weight: 70
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    setHealthData(prev => ({
      ...prev,
      [field]: value
    }));
    // Auto-save to localStorage
    localStorage.setItem('healthData', JSON.stringify({
      ...healthData,
      [field]: value
    }));
  };

  const handleProfileChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
    // Auto-save to localStorage
    localStorage.setItem('userProfile', JSON.stringify({
      ...userProfile,
      [field]: value
    }));
  };

  const calculateBMI = () => {
    const heightInM = userProfile.height / 100;
    return (userProfile.weight / (heightInM * heightInM)).toFixed(1);
  };

  const predictHealthRisk = async () => {
    setLoading(true);
    
    // Simulate AI processing delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Mock AI health risk prediction based on user data
      const bmi = parseFloat(calculateBMI());
      const age = userProfile.age;
      
      // Enhanced AI algorithm simulation
      let riskScore = 0;
      
      // Age factor (enhanced importance as per ML model)
      if (age < 25) riskScore += 0.1;
      else if (age < 40) riskScore += 0.2;
      else if (age < 55) riskScore += 0.35;
      else if (age < 70) riskScore += 0.5;
      else riskScore += 0.7;
      
      // BMI factor
      if (bmi < 18.5) riskScore += 0.15; // Underweight
      else if (bmi >= 18.5 && bmi < 25) riskScore += 0.05; // Normal
      else if (bmi >= 25 && bmi < 30) riskScore += 0.2; // Overweight
      else riskScore += 0.35; // Obese
      
      // Lifestyle factors from health data
      if (healthData.exercise < 150) riskScore += 0.15; // Less than recommended weekly exercise
      if (healthData.sleep < 7) riskScore += 0.1; // Insufficient sleep
      if (healthData.calories > 2500) riskScore += 0.1; // High calorie intake
      
      // Gender factor
      if (userProfile.gender === 'Male' && age > 45) riskScore += 0.05;
      if (userProfile.gender === 'Female' && age > 55) riskScore += 0.05;
      
      // Ensure score is within bounds
      riskScore = Math.max(0.05, Math.min(0.95, riskScore));
      
      const riskLevel = riskScore > 0.6 ? 'High' : riskScore > 0.3 ? 'Medium' : 'Low';
      
      // Generate personalized recommendations
      const recommendations = generateRecommendations(bmi, age, riskLevel);
      
      setHealthRisk({
        risk_level: riskLevel,
        risk_score: riskScore,
        wellness_score: 1 - riskScore,
        recommendations: recommendations,
        age_factor: age < 30 ? 'Low' : age < 50 ? 'Medium' : 'High',
        bmi_category: bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'
      });
      
    } catch (error) {
      console.error('Error in AI prediction:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const generateRecommendations = (bmi, age, riskLevel) => {
    const recommendations = [];
    
    if (bmi > 25) recommendations.push("Consider a balanced diet with reduced calorie intake");
    if (bmi < 18.5) recommendations.push("Focus on healthy weight gain with nutritious foods");
    if (healthData.exercise < 150) recommendations.push("Increase physical activity to 150+ minutes per week");
    if (healthData.sleep < 7) recommendations.push("Prioritize 7-9 hours of quality sleep nightly");
    if (age > 40) recommendations.push("Regular health check-ups become increasingly important");
    if (riskLevel === 'High') recommendations.push("Consult with healthcare professionals for personalized guidance");
    
    recommendations.push("Stay hydrated with 8+ glasses of water daily");
    recommendations.push("Include fruits and vegetables in your daily diet");
    
    return recommendations.join(". ");
  };

  const saveHealthData = () => {
    // Save data to localStorage
    localStorage.setItem('healthData', JSON.stringify(healthData));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('healthRisk', JSON.stringify(healthRisk));
    alert('✅ Health data saved successfully!');
  };

  useEffect(() => {
    // Load saved data from localStorage
    const savedHealthData = localStorage.getItem('healthData');
    const savedProfile = localStorage.getItem('userProfile');
    const savedRisk = localStorage.getItem('healthRisk');
    
    if (savedHealthData) {
      setHealthData(JSON.parse(savedHealthData));
    }
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    if (savedRisk) {
      setHealthRisk(JSON.parse(savedRisk));
    }
  }, []);

  const generateWeeklyData = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => ({
      day,
      calories: Math.max(1500, healthData.calories + (Math.random() * 400 - 200)),
      exercise: Math.max(0, healthData.exercise + (Math.random() * 20 - 10)),
      sleep: Math.max(5, healthData.sleep + (Math.random() * 2 - 1)),
      steps: Math.max(3000, healthData.steps + (Math.random() * 2000 - 1000))
    }));
  };

  const weeklyData = generateWeeklyData();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ 
          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          🌸 Blooming Health
        </Typography>
        <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
          AI-Powered Personal Health Management
        </Typography>
        <Chip 
          icon={<Psychology />} 
          label="Enhanced with Machine Learning" 
          color="primary" 
          variant="outlined" 
        />
      </Box>

      {/* Health Risk Assessment */}
      {healthRisk && (
        <Alert 
          severity={healthRisk.risk_level === 'Low' ? 'success' : healthRisk.risk_level === 'Medium' ? 'warning' : 'error'}
          sx={{ mb: 3, fontSize: '1.1rem' }}
          icon={<Favorite />}
        >
          <Typography variant="h6">
            🎯 AI Health Assessment: {healthRisk.risk_level} Risk Level
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Risk Score:</strong> {(healthRisk.risk_score * 100).toFixed(1)}% | 
            <strong> Wellness Score:</strong> {(healthRisk.wellness_score * 100).toFixed(1)}%
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>BMI Category:</strong> {healthRisk.bmi_category} | 
            <strong> Age Factor:</strong> {healthRisk.age_factor}
          </Typography>
          <Typography variant="body2">
            💡 <strong>Recommendations:</strong> {healthRisk.recommendations}
          </Typography>
        </Alert>
      )}

      {/* Quick Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-5px)' }
          }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Restaurant sx={{ mr: 1, fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">Daily Calories</Typography>
                  <Typography variant="h4">{healthData.calories}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min((healthData.calories / 2500) * 100, 100)} 
                    sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-5px)' }
          }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <FitnessCenter sx={{ mr: 1, fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">Exercise (min)</Typography>
                  <Typography variant="h4">{healthData.exercise}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min((healthData.exercise / 60) * 100, 100)} 
                    sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
            color: 'white',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-5px)' }
          }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Hotel sx={{ mr: 1, fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">Sleep Hours</Typography>
                  <Typography variant="h4">{healthData.sleep}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min((healthData.sleep / 9) * 100, 100)} 
                    sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)',
            color: 'white',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-5px)' }
          }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <EmojiEvents sx={{ mr: 1, fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">Health Score</Typography>
                  <Typography variant="h4">
                    {healthRisk ? (healthRisk.wellness_score * 100).toFixed(0) : '85'}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={healthRisk ? (healthRisk.wellness_score * 100) : 85} 
                    sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Tabbed Interface */}
      <Paper sx={{ width: '100%', mt: 3, borderRadius: 2 }} elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="health tracker tabs" variant="fullWidth">
            <Tab icon={<Person />} label="Profile Setup" />
            <Tab icon={<Add />} label="Log Health Data" />
            <Tab icon={<Timeline />} label="Weekly Trends" />
            <Tab icon={<LocalHospital />} label="AI Analysis" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Person sx={{ mr: 1 }} /> Personal Profile Setup
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">Basic Information</Typography>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Age (years)"
                      type="number"
                      value={userProfile.age}
                      onChange={(e) => handleProfileChange('age', parseInt(e.target.value))}
                      sx={{ mb: 2 }}
                      inputProps={{ min: 1, max: 120 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={userProfile.gender}
                        label="Gender"
                        onChange={(e) => handleProfileChange('gender', e.target.value)}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Height (cm)"
                      type="number"
                      value={userProfile.height}
                      onChange={(e) => handleProfileChange('height', parseInt(e.target.value))}
                      sx={{ mb: 2 }}
                      inputProps={{ min: 50, max: 250 }}
                    />
                    <TextField
                      fullWidth
                      label="Weight (kg)"
                      type="number"
                      value={userProfile.weight}
                      onChange={(e) => handleProfileChange('weight', parseInt(e.target.value))}
                      inputProps={{ min: 20, max: 300 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">Health Metrics</Typography>
                  <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                      BMI: {calculateBMI()}
                    </Typography>
                    <Chip 
                      label={
                        parseFloat(calculateBMI()) < 18.5 ? 'Underweight' :
                        parseFloat(calculateBMI()) < 25 ? 'Normal Weight' :
                        parseFloat(calculateBMI()) < 30 ? 'Overweight' : 'Obese'
                      }
                      color={
                        parseFloat(calculateBMI()) < 18.5 ? 'warning' :
                        parseFloat(calculateBMI()) < 25 ? 'success' :
                        parseFloat(calculateBMI()) < 30 ? 'warning' : 'error'
                      }
                      size="large"
                      sx={{ mb: 2 }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={predictHealthRisk}
                    disabled={loading}
                    size="large"
                    sx={{ mt: 2 }}
                    startIcon={loading ? <CircularProgress size={20} /> : <Psychology />}
                  >
                    {loading ? 'AI Analyzing...' : '🧠 Run AI Health Analysis'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Add sx={{ mr: 1 }} /> Daily Health Data Logging
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">Today's Metrics</Typography>
                  <TextField
                    fullWidth
                    label="Calories Consumed"
                    type="number"
                    value={healthData.calories}
                    onChange={(e) => handleInputChange('calories', parseInt(e.target.value))}
                    sx={{ mb: 2 }}
                    inputProps={{ min: 500, max: 5000 }}
                    helperText="Daily caloric intake"
                  />
                  <TextField
                    fullWidth
                    label="Exercise Minutes"
                    type="number"
                    value={healthData.exercise}
                    onChange={(e) => handleInputChange('exercise', parseInt(e.target.value))}
                    sx={{ mb: 2 }}
                    inputProps={{ min: 0, max: 300 }}
                    helperText="Physical activity duration"
                  />
                  <TextField
                    fullWidth
                    label="Sleep Hours"
                    type="number"
                    step="0.5"
                    value={healthData.sleep}
                    onChange={(e) => handleInputChange('sleep', parseFloat(e.target.value))}
                    sx={{ mb: 2 }}
                    inputProps={{ min: 0, max: 12, step: 0.5 }}
                    helperText="Hours of sleep last night"
                  />
                  <TextField
                    fullWidth
                    label="Steps Taken"
                    type="number"
                    value={healthData.steps}
                    onChange={(e) => handleInputChange('steps', parseInt(e.target.value))}
                    sx={{ mb: 2 }}
                    inputProps={{ min: 0, max: 50000 }}
                    helperText="Daily step count"
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Save />}
                    onClick={saveHealthData}
                    color="success"
                    size="large"
                  >
                    Save Today's Data
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">Daily Goals Progress</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color={healthData.calories <= 2200 ? 'success' : 'error'} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Calorie Goal: ≤ 2,200"
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Current: {healthData.calories} ({healthData.calories <= 2200 ? '✅ On track!' : '⚠️ Over limit'})
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.min((healthData.calories / 2200) * 100, 100)} 
                              sx={{ mt: 1 }}
                              color={healthData.calories <= 2200 ? 'success' : 'error'}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color={healthData.exercise >= 30 ? 'success' : 'warning'} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Exercise Goal: ≥ 30 min"
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Current: {healthData.exercise} min ({healthData.exercise >= 30 ? '✅ Great job!' : '⚠️ Need more'})
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.min((healthData.exercise / 30) * 100, 100)} 
                              sx={{ mt: 1 }}
                              color={healthData.exercise >= 30 ? 'success' : 'warning'}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color={healthData.sleep >= 7 ? 'success' : 'warning'} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Sleep Goal: ≥ 7 hours"
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Current: {healthData.sleep}h ({healthData.sleep >= 7 ? '✅ Well rested!' : '⚠️ Need more sleep'})
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.min((healthData.sleep / 7) * 100, 100)} 
                              sx={{ mt: 1 }}
                              color={healthData.sleep >= 7 ? 'success' : 'warning'}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Timeline sx={{ mr: 1 }} /> Weekly Health Trends
          </Typography>
          <Grid container spacing={2}>
            {weeklyData.map((day, index) => (
              <Grid item xs={12} key={day.day}>
                <Card elevation={1} sx={{ mb: 1 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">{day.day}</Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={6} sm={3}>
                        <Box textAlign="center" sx={{ p: 2, bgcolor: 'rgba(254, 107, 139, 0.1)', borderRadius: 1 }}>
                          <Typography variant="h5" color="primary">
                            {Math.round(day.calories)}
                          </Typography>
                          <Typography variant="caption">Calories</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box textAlign="center" sx={{ p: 2, bgcolor: 'rgba(33, 150, 243, 0.1)', borderRadius: 1 }}>
                          <Typography variant="h5" color="secondary">
                            {Math.round(day.exercise)}
                          </Typography>
                          <Typography variant="caption">Exercise (min)</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box textAlign="center" sx={{ p: 2, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 1 }}>
                          <Typography variant="h5" sx={{ color: 'success.main' }}>
                            {day.sleep.toFixed(1)}
                          </Typography>
                          <Typography variant="caption">Sleep (hrs)</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box textAlign="center" sx={{ p: 2, bgcolor: 'rgba(255, 152, 0, 0.1)', borderRadius: 1 }}>
                          <Typography variant="h5" sx={{ color: 'warning.main' }}>
                            {Math.round(day.steps).toLocaleString()}
                          </Typography>
                          <Typography variant="caption">Steps</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalHospital sx={{ mr: 1 }} /> AI-Powered Health Analysis
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Psychology sx={{ mr: 1 }} color="primary" />
                    Current Health Assessment
                  </Typography>
                  {healthRisk ? (
                    <Box>
                      <Alert 
                        severity={healthRisk.risk_level === 'Low' ? 'success' : 'warning'} 
                        sx={{ mb: 2 }}
                        icon={<Favorite />}
                      >
                        <Typography variant="h6">Risk Level: {healthRisk.risk_level}</Typography>
                      </Alert>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>🎯 Risk Score:</strong> {(healthRisk.risk_score * 100).toFixed(1)}%
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={healthRisk.risk_score * 100} 
                          color={healthRisk.risk_level === 'Low' ? 'success' : 'warning'}
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>💪 Wellness Score:</strong> {(healthRisk.wellness_score * 100).toFixed(1)}%
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={healthRisk.wellness_score * 100} 
                          color="success"
                        />
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>📊 BMI Category:</strong> {healthRisk.bmi_category}
                      </Typography>
                      <Typography variant="body2">
                        <strong>🎂 Age Factor:</strong> {healthRisk.age_factor} Risk
                      </Typography>
                    </Box>
                  ) : (
                    <Box textAlign="center" sx={{ py: 4 }}>
                      <Psychology sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                        No AI analysis available yet
                      </Typography>
                      <Button 
                        variant="outlined" 
                        onClick={predictHealthRisk} 
                        disabled={loading}
                        startIcon={<Psychology />}
                      >
                        {loading ? 'Analyzing...' : 'Run AI Analysis'}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ mr: 1 }} color="primary" />
                    Personalized Recommendations
                  </Typography>
                  {healthRisk?.recommendations ? (
                    <Box>
                      <Typography variant="body1" sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        💡 {healthRisk.recommendations}
                      </Typography>
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>Quick Action Items:</Typography>
                        <Box sx={{ mt: 2 }}>
                          <Chip label="🏃‍♀️ Daily Exercise" color="primary" sx={{ mr: 1, mb: 1 }} />
                          <Chip label="🥗 Balanced Nutrition" color="secondary" sx={{ mr: 1, mb: 1 }} />
                          <Chip label="😴 Quality Sleep" color="success" sx={{ mr: 1, mb: 1 }} />
                          <Chip label="💧 Stay Hydrated" color="info" sx={{ mr: 1, mb: 1 }} />
                          <Chip label="🧘‍♀️ Stress Management" color="warning" sx={{ mr: 1, mb: 1 }} />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box textAlign="center" sx={{ py: 4 }}>
                      <TrendingUp sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                      <Typography variant="body1" color="textSecondary">
                        Run AI analysis to get personalized health recommendations based on your profile and daily metrics.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Footer */}
      <Box textAlign="center" sx={{ mt: 4, py: 3 }}>
        <Typography variant="body2" color="textSecondary">
          🌸 Blooming Health - Your AI-Powered Health Companion | Built with React & Material-UI
        </Typography>
        <Typography variant="caption" color="textSecondary">
          * This is a demonstration app. Consult healthcare professionals for medical advice.
        </Typography>
      </Box>
    </Container>
  );
};

export default HealthDashboard;
