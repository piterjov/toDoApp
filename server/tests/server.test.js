const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
    text: 'Frist test todo'
}, {
    text: 'Second dummu test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);

    }).then(() => done());
});
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                   return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[todos.length-1].text).toBe(text);
                    done();
                }).catch((e) => done(e))
        });
    });

    it('should not create todo with invalid body data', (done) => {
         request(app)
             .post('/todos')
             .send({ text: 'Test todo text'})
             .expect(200)
             .expect((res) => {
                expect(res.body.text).toBe('Test todo text');
        }).end((err, res) => {
             if (err) {
                 return done(err);
             }
             Todo.find().then((todos) => {
                 expect(todos.length).toBe(3);
                 expect(todos[todos.length-1].text).toBe('Test todo text');
                 done();
             }).catch((e) => done(e))

         });
    });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});