import app from '../server';
import request from 'supertest';

app.listen(4003, () => {
  console.log('App listening on port 4001!');
});
let empId = ""
let testToken = ""
let errorToken:any = !testToken;






describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/emp')
      .set('Content-Type', 'application/json')
      .send(
        {
          "employeeId": "4567D",
          "firstName": "RAJA",
          "lastName": "RAM",
          "address": {
            "no": 12,
            "street": "abcd street",
            "place": "AAAA",
            "tk": "BBBB",
            "dt": "CCCC",
            "state": "DDDD",
            "pin": 675765
          },
          "mobileNumber": 9876543210
        })
    empId = res.body.employee._id
    testToken = res.body.token
    expect(res.status).toEqual(201);
  })

  it('should be validation Error', async () => {
    const res = await request(app)
      .post('/emp')
      .set('Content-Type', 'application/json')
      .send(
        {
          "employeeId": "456SHEKARD",
          "firstName": "AAAAAAAAAA",
          "address": {
            "no": 12,
            "street": "abcd street",
            "place": "AAAA",
            "tk": "BBBB",
            "dt": "CCCC",
            "state": "DDDD",
            "pin": 675765
          },
          "mobileNumber": 9876543210,
        })
    expect(res.status).toEqual(400);
  })
})


describe('GETALL Endpoints', () => {
  it('getting all the data', async () => {
    const res = await request(app)
      .get('/emp')
      .set('authorization', testToken)
    expect(res.status).toEqual(200)
  })
  it('attemped on an invalid Token', async () => {
    const res = await request(app)
      .get('/emp')
      .set('authorization', errorToken)
    expect(res.status).toEqual(500)
  })
})

describe('GET Endpoints', () => {
  it('getting data by id', async () => {
    const res = await request(app)
      .get('/emp/' + empId)
      .set('authorization', testToken)
    expect(res.status).toEqual(200)
  })
  it('getting by an invalid id', async () => {
    const res = await request(app)
      .get('/emp/' + (!empId))
      .set('authorization', testToken)
    expect(res.status).toEqual(404)
  })
  it('attemped on an invalid Token', async () => {
    const res = await request(app)
      .get('/emp/' + empId)
      .set('authorization', errorToken)
    expect(res.status).toEqual(500)
  })
})


describe('PUT Endpoints', () => {
  it('Updating data by id', async () => {
    const res = await request(app)
      .put('/emp/' + empId)
      .set('authorization', testToken)
    expect(res.status).toEqual(201)
  })
  it('getting by an invalid id', async () => {
    const res = await request(app)
      .put('/emp/' + (!empId))
      .set('authorization', testToken)
    expect(res.status).toEqual(404)
  })
  it('attemped on an invalid Token', async () => {
    const res = await request(app)
      .get('/emp/' + empId)
      .set('authorization', errorToken)
    expect(res.status).toEqual(500)
  })
})

describe('DELETE Endpoints', () => {
  it('Deleting data by id', async () => {
    const res = await request(app)
      .delete('/emp/' + empId)
      .set('authorization', testToken)
    expect(res.status).toEqual(204)
  })
  it('getting by an invalid id', async () => {
    const res = await request(app)
      .delete('/emp/' + (!empId))
      .set('authorization', testToken)
    expect(res.status).toEqual(404)
  })
  it('attemped on an invalid Token', async () => {
    const res = await request(app)
      .delete('/emp/' + empId)
      .set('authorization', errorToken)
    expect(res.status).toEqual(500)
  })
})



