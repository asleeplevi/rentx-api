# 🚗 Rentx rules

TESTE
## 📍 Sumário
**RF**  => Requisitos funcionais (Funcionalidades da aplicação)

**RNF** => Requisistor que não estão ligados a regra de negócio (como libs, e coisas relacionadas ao desenvolvimento)

**RN**  => Regra de negócio


### Cadastro de carro
**RF**
- Deve ser possível cadastrar um novo carro
- Deve ser possível listar todas as categorias

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente
- Não deve ser possível alterar a placa de um carro
- O carro deve ser cadastrado com disponibilidade por padrão
- Somente um usuário administrador que poderá cadastrar um novo carro

### Listagem de carros
**RF**
- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros pela marca
- Deve ser possível listar todos os carros pela categoria
- Deve ser possível listar todos os carros pelo nome do carro

**RN**
- Não é necessário estar logado no sistema para listar os carros

### Cadastro de Especificação no carro
**RF**
- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
- Somente um usuário administrador deve cadastrar uma especificação

### Cadastro de imagens do carro
**RF**
- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros 
**RNF**
- Utilizar o multer para upload dos arquivos

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- Somente um administrador poderá cadastar uma nova imagem

### Aluguel do carro

**RF**
- Deve ser possivel cadastrar um aluguel

**RN**
- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possível cadastrar um novo aluguel caso já exista para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel para o mesmo carro
