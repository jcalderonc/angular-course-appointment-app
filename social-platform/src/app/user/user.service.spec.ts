import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  // Configuración del TestBed antes de cada prueba
  // Se ejecuta una vez antes de cada prueba
  // Se asegura de que el servicio UserService esté disponible para las pruebas
  beforeEach(()=>{
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  })

  // Prueba para verificar que el servicio se crea correctamente
  it('Should be created',() => {
    expect(service).toBeTruthy();
  })
  
  // Prueba para verificar que el método getUsers devuelve una lista de usuarios
  it('Should return a list of users', (done) => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBeGreaterThan(0);
      done();
    });
  });
});
