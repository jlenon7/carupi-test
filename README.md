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

## ENDPOINTS

| METHOD    | URI                 | NAME            |
| --------- | ------------------- | ----------------|
| GET       | api/v1/cars         | cars.index      |
| POST      | api/v1/cars         | cars.store      |
| GET       | api/v1/cars/:id     | cars.show       |
| PUT       | api/v1/cars/:id     | cars.update     |
| DELETE    | api/v1/cars/:id     | cars.delete     |

### Query Search em cars.index

Listagem paginadas: `?offset=0&limit=10`

Listagem entre preços: `?since_price=20000.00&max_price=40000.00`

Listagem entre ano: `?since_year=2018&max_year=2021`

## OBSERVAÇÃO

Essa API está rodando dentro de um servidor no Heroku apenas para ter um acesso mais simplificado ao `Swagger`. [Clique aqui para acessar!](https://carupi-test.herokuapp.com/api/swagger)

Não esqueça de criar o arquivo com as váriaveis de ambiente para rodar os testes ou modo development.

## COMANDOS

```bash
cp .env.example .env.testing && yarn test
cp .env.example .env && yarn start:dev
```

## REQUISITOS

- [ ] API RESTful
- [ ] CRUD de Carros
- [ ] Adicionar Rate Limiter
- [ ] Implementar testes E2E no Resource Cars
- [ ] Implementar teste unitário na camada de serviço
- [ ] No filtro ser possível pesquisar por cadas atributo do carro e poder ter range de ano e preço
- [ ] Criar Schema Cars com os seguintes atributos - brand, model, version, year, mileage, gearboxType & sellPrice.

## INSTRUÇÕES

- Deve ser utilizado NodeJS e MongoDb
- Crie um README com orientações para a instalação.
- O projeto deve ser entregue através de um ou mais repositórios no github.

---
