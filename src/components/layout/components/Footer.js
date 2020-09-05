import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const ListStyle = {
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  paddingLeft: 0
}

const ListItemStyle = {
  padding: '10px 0'
}

const LinkStyle = {
  textDecoration: 'none',
  color: '#585858'
}

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <>
      <Grid
        container
        style={{
          padding: '25px 0',
          borderTop: '1px solid #dadada'
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="h4">Fission</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">PLATFORM</Typography>
              <ul style={ListStyle}>
                <li style={ListItemStyle}>
                  <Link to="/about" style={LinkStyle}>
                    Tentang Kami
                  </Link>
                </li>
                <li style={ListItemStyle}>
                  <Link to="/blog" style={LinkStyle}>
                    Blog
                  </Link>
                </li>
                <li style={ListItemStyle}>
                  <Link to="/news" style={LinkStyle}>
                    Berita Terbaru
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">FITUR</Typography>
              <ul style={ListStyle}>
                <li style={ListItemStyle}>
                  <Link to="/skills" style={LinkStyle}>
                    Skills
                  </Link>
                </li>
                <li style={ListItemStyle}>
                  <Link to="/jobs" style={LinkStyle}>
                    Job
                  </Link>
                </li>
                <li style={ListItemStyle}>
                  <Link to="/marketplace" style={LinkStyle}>
                    Marketplace
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">SUPPORT</Typography>
              <ul style={ListStyle}>
                <li style={ListItemStyle}>
                  <Link to="/support" style={LinkStyle}>
                    Bantuan
                  </Link>
                </li>
                <li style={ListItemStyle}>
                  <Link to="/faq" style={LinkStyle}>
                    FAQ
                  </Link>
                </li>
                <li style={ListItemStyle}>
                  <Link to="/kontak" style={LinkStyle}>
                    Kontak
                  </Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid container style={{ backgroundColor: '#dadada', padding: '20px 0' }}>
        <Container maxWidth="lg" style={{ display: 'flex' }}>
          <Typography style={{ fontSize: 14, color: '#585858' }}>
            {`Copyright © ${year} - Fission Platform. All rights reserved.`}
          </Typography>
        </Container>
      </Grid>
    </>
  )
}

export default Footer
