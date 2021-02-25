# Carupi Test 🧠

> Project developed in test for Carupi

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/jlenon7/carupi-test.svg?style=social&label=Star&maxAge=2592000)](https://github.com/jlenon7/carupi-test/stargazers/)

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jlenon7/carupi-test?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/jlenon7/carupi-test?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

Jubscleiton está lançando uma nova plataforma de vendas de `carros`. Nesta plataforma, desejamos realizar o cadastro de novos carros para os clientes consultarem.

<img src="https://www.projetodraft.com/wp-content/uploads/2020/10/logo_carupi.png" width="400px" align="right" hspace="30px" vspace="100px">

## OBSERVAÇÃO

Essa API está rodando dentro de um servidor no Heroku apenas para ter um acesso mais simplificado ao `Swagger`. [Clique aqui para acessar!](https://carupi-test.herokuapp.com/api/swagger) PS: Aguarde o carregamento da página. Como está no plano free, o Heroku desliga a máquina automaticamente quando o servidor para de ser consumido, e só quando uma nova requisição chega que ele roda o servidor novamente, esse processo demora um pouco.

Não esqueça de criar o arquivo com as váriaveis de ambiente para rodar os testes ou modo development.

## ENDPOINTS

| METHOD    | URI                     | NAME            |
| --------- | ----------------------- | ----------------|
| GET       | /api/v1/cars            | cars.index      |
| POST      | /api/v1/cars            | cars.store      |
| GET       | /api/v1/cars/:token     | cars.show       |
| PUT       | /api/v1/cars/:token     | cars.update     |
| DELETE    | /api/v1/cars/:token     | cars.delete     |

JSON Example POST/PUT

```json
{
  "brand": "Nissan",
  "model": "Skyline",
  "version": "R34",
  "year": 1990,
  "mileage": 0,
  "gearboxType": "manual",
  "price": 100000,
  "status": "approved",
}
```

### Query Search em cars.index

Listagem paginadas: `?offset=0&limit=10`

Listagem entre ano: `?since_year=2018&max_year=2021`

Listagem entre preços: `?since_price=200000&max_price=400000`

---

| METHOD    | URI                  | NAME            |
| --------- | -------------------- | ----------------|
| GET       | /api/v1/auth/me      | auth.me         |
| POST      | /api/v1/auth/login   | auth.login      |
| POST      | /api/v1/auth/register| auth.register   |

JSON Example POST Register

```json
{
  "name": "João Lenon",
  "email": "lenonSec7@gmail.com",
  "password": "12345678",
  "password_confirmation": "12345678",
}
```

## COMANDOS

Instale as dependências

```bash
yarn
```

Gere o arquivo .env

```bash
cp .env.example .env && cp .env.example .env.testing
```

Para rodar os testes E2E e Unitários

```bash
yarn test
```

Para rodar a aplicação em modo desenvolvimento

```bash
yarn start:dev
```

## REQUISITOS

- [x] API RESTful
- [x] CRUD de Carros
- [x] Autenticação JWT
- [x] Adicionar Rate Limiter
- [x] Implementar testes E2E no Resource Auth
- [x] Implementar testes E2E no Resource Cars
- [x] Implementar teste unitário na camada de serviços
- [x] No filtro ser possível pesquisar por cada atributo do carro e poder ter range de ano e preço
- [x] Criar Schema Cars com os seguintes atributos - brand, model, version, year, mileage, gearboxType & sellPrice.

## INSTRUÇÕES

- Deve ser utilizado NodeJS e MongoDb
- Crie um README com orientações para a instalação.
- O projeto deve ser entregue através de um ou mais repositórios no github.

---
