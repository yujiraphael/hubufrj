import type { Subject, SubjectTask, SubjectMaterial } from './types';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

const inTwoWeeks = new Date(today);
inTwoWeeks.setDate(inTwoWeeks.getDate() + 14);

const inThreeDays = new Date(today);
inThreeDays.setDate(inThreeDays.getDate() + 3);

function toISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const mockSubjects: Subject[] = [
  {
    id: 'calc2',
    code: 'CALC2',
    name: 'Cálculo 2',
    department: 'Matemática / IME',
    professor: 'Prof. Dr. Carlos Silva',
    classCode: '[Unif][13-15] Turma A',
    schedule: {
      days: ['seg', 'qua'],
      startTime: '13:00',
      endTime: '15:00',
      room: 'Sala 201 - Bloco A',
    },
    nextClass: {
      date: toISO(today),
      topic: 'Integrais Múltiplas - Coordenadas Polares',
      room: 'Sala 201 - Bloco A',
    },
    nextExam: {
      date: toISO(inThreeDays),
      title: 'Prova 1 - Integrais Duplas e Triplas',
      weight: 0.4,
      room: 'Auditório 1 - Bloco A',
    },
    tasks: [
      {
        id: 'calc2-task-1',
        title: 'Lista de Exercícios 3 - Coordenadas Polares',
        description: 'Resolver exercícios 1-15 da apostila capítulo 4',
        dueDate: toISO(tomorrow),
        status: 'pending',
        priority: 'high',
        estimatedHours: 3,
      },
      {
        id: 'calc2-task-2',
        title: 'Revisão para Prova 1',
        description: 'Revisar integrais duplas, mudança de variáveis, aplicações',
        dueDate: toISO(inThreeDays),
        status: 'in_progress',
        priority: 'high',
        estimatedHours: 5,
      },
    ],
    progress: {
      overall: 55,
      attendance: 85,
      grades: 60,
      materialsRead: 70,
      tasksCompleted: 30,
    },
    materials: [
      {
        id: 'calc2-mat-1',
        title: 'Apostila Capítulo 4 - Integrais Múltiplas',
        type: 'pdf',
        url: '/materiais/calc2/cap4-integrais-multiplas.pdf',
        dateAdded: toISO(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)),
        isRead: true,
        tags: ['apostila', 'capitulo-4'],
      },
      {
        id: 'calc2-mat-2',
        title: 'Videoaula: Coordenadas Polares e Cilíndricas',
        type: 'video',
        url: 'https://youtube.com/watch?v=calc2-polares',
        dateAdded: toISO(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)),
        isRead: false,
        tags: ['videoaula', 'coordenadas-polares'],
      },
      {
        id: 'calc2-mat-3',
        title: 'Lista de Exercícios 3',
        type: 'pdf',
        url: '/materiais/calc2/lista-3.pdf',
        dateAdded: toISO(today),
        isRead: false,
        tags: ['exercicios', 'lista-3'],
      },
    ],
    attendance: {
      totalClasses: 12,
      attendedClasses: 10,
      percentage: 83,
      lastUpdated: toISO(today),
    },
  },
  {
    id: 'qo1',
    code: 'QO1',
    name: 'Química Orgânica I',
    department: 'Química / EQ',
    professor: 'Prof. Dr. Ana Santos',
    classCode: 'EQ/EQA - Turma 1',
    schedule: {
      days: ['ter', 'qui'],
      startTime: '15:30',
      endTime: '17:00',
      room: 'Sala 305 - Bloco B',
    },
    nextClass: {
      date: toISO(tomorrow),
      topic: 'Estereoquímica - Quiralidade e Enantiômeros',
      room: 'Sala 305 - Bloco B',
    },
    nextExam: {
      date: toISO(nextWeek),
      title: 'Prova 2 - Estereoquímica e Reações de Substituição',
      weight: 0.35,
      room: 'Sala 305 - Bloco B',
    },
    tasks: [
      {
        id: 'qo1-task-1',
        title: 'Relatório de Laboratório - Síntese de Aspirina',
        description: 'Entregar relatório completo com cálculos de rendimento',
        dueDate: toISO(dayAfterTomorrow),
        status: 'in_progress',
        priority: 'high',
        estimatedHours: 4,
      },
      {
        id: 'qo1-task-2',
        title: 'Estudo: Mecanismos SN1 e SN2',
        description: 'Revisar mecanismos, fatores que influenciam, exemplos',
        dueDate: toISO(nextWeek),
        status: 'pending',
        priority: 'medium',
        estimatedHours: 3,
      },
    ],
    progress: {
      overall: 45,
      attendance: 90,
      grades: 50,
      materialsRead: 40,
      tasksCompleted: 25,
    },
    materials: [
      {
        id: 'qo1-mat-1',
        title: 'Slides Aula 8 - Estereoquímica',
        type: 'slide',
        url: '/materiais/qo1/aula-8-estereoquimica.pdf',
        dateAdded: toISO(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)),
        isRead: true,
        tags: ['slides', 'aula-8'],
      },
      {
        id: 'qo1-mat-2',
        title: 'Artigo: Quiralidade na Indústria Farmacêutica',
        type: 'link',
        url: 'https://example.com/quiralidade-farmaceutica',
        dateAdded: toISO(new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000)),
        isRead: false,
        tags: ['artigo', 'aplicacao'],
      },
      {
        id: 'qo1-mat-3',
        title: 'Roteiro de Laboratório - Síntese de Aspirina',
        type: 'pdf',
        url: '/materiais/qo1/lab-aspirina.pdf',
        dateAdded: toISO(new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000)),
        isRead: true,
        tags: ['lab', 'roteiro'],
      },
    ],
    attendance: {
      totalClasses: 10,
      attendedClasses: 9,
      percentage: 90,
      lastUpdated: toISO(today),
    },
  },
  {
    id: 'qae1',
    code: 'QAE1',
    name: 'Química Analítica Experimental I',
    department: 'Química / EQ',
    professor: 'Prof. Dr. Roberto Costa',
    classCode: 'EAB/EBB/QIB/EQB - Turma 2',
    schedule: {
      days: ['seg', 'qua'],
      startTime: '08:00',
      endTime: '10:00',
      room: 'Laboratório 3 - Bloco C',
    },
    nextClass: {
      date: toISO(today),
      topic: 'Titulação Potenciométrica - Determinação de pKa',
      room: 'Laboratório 3 - Bloco C',
    },
    nextExam: {
      date: toISO(inTwoWeeks),
      title: 'Prova Prática - Técnicas de Titulação',
      weight: 0.3,
      room: 'Laboratório 3 - Bloco C',
    },
    tasks: [
      {
        id: 'qae1-task-1',
        title: 'Relatório Lab 5 - Titulação Ácido-Base',
        description: 'Curva de titulação, ponto de equivalência, indicadores',
        dueDate: toISO(tomorrow),
        status: 'done',
        priority: 'medium',
        estimatedHours: 2,
      },
      {
        id: 'qae1-task-2',
        title: 'Preparação para Prova Prática',
        description: 'Revisar montagem de bureta, calibração de pHmetro, cálculos',
        dueDate: toISO(inTwoWeeks),
        status: 'pending',
        priority: 'high',
        estimatedHours: 4,
      },
    ],
    progress: {
      overall: 70,
      attendance: 95,
      grades: 75,
      materialsRead: 80,
      tasksCompleted: 60,
    },
    materials: [
      {
        id: 'qae1-mat-1',
        title: 'Manual de Laboratório - Titulações',
        type: 'pdf',
        url: '/materiais/qae1/manual-titulacoes.pdf',
        dateAdded: toISO(new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000)),
        isRead: true,
        tags: ['manual', 'lab'],
      },
      {
        id: 'qae1-mat-2',
        title: 'Videoaula: Titulação Potenciométrica',
        type: 'video',
        url: 'https://youtube.com/watch?v=qae1-potenciometrica',
        dateAdded: toISO(new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)),
        isRead: false,
        tags: ['videoaula', 'titulacao'],
      },
    ],
    attendance: {
      totalClasses: 8,
      attendedClasses: 8,
      percentage: 100,
      lastUpdated: toISO(today),
    },
  },
  {
    id: 'fdt',
    code: 'FDT',
    name: 'Fundamentos de Desenho Técnico',
    department: 'Engenharia / EQA+EQB',
    professor: 'Prof. Dr. Marcos Lima',
    classCode: 'EQA+EQB - Turma Única',
    schedule: {
      days: ['ter', 'qui'],
      startTime: '10:30',
      endTime: '12:00',
      room: 'Sala 204 - Bloco D',
    },
    nextClass: {
      date: toISO(tomorrow),
      topic: 'Projeções Ortogonais - Vistas Superior, Frontal, Lateral',
      room: 'Sala 204 - Bloco D',
    },
    nextExam: {
      date: toISO(new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)),
      title: 'Prova 1 - Projeções e Cortes',
      weight: 0.4,
      room: 'Sala 204 - Bloco D',
    },
    tasks: [
      {
        id: 'fdt-task-1',
        title: 'Exercício de Prancha - Projeções Ortogonais',
        description: 'Desenhar 3 peças com vistas ortogonais completas',
        dueDate: toISO(dayAfterTomorrow),
        status: 'pending',
        priority: 'high',
        estimatedHours: 3,
      },
      {
        id: 'fdt-task-2',
        title: 'Estudo: Tipos de Cortes e Secções',
        description: 'Cortes totais, parciais, deslocados, alinhados',
        dueDate: toISO(new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)),
        status: 'pending',
        priority: 'medium',
        estimatedHours: 2,
      },
    ],
    progress: {
      overall: 40,
      attendance: 80,
      grades: 55,
      materialsRead: 35,
      tasksCompleted: 20,
    },
    materials: [
      {
        id: 'fdt-mat-1',
        title: 'Apostila - Projeções Ortogonais (NBR 6492)',
        type: 'pdf',
        url: '/materiais/fdt/projecoes-ortogonais.pdf',
        dateAdded: toISO(new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000)),
        isRead: true,
        tags: ['apostila', 'norma'],
      },
      {
        id: 'fdt-mat-2',
        title: 'Tutorial: AutoCAD Básico para Desenho Técnico',
        type: 'video',
        url: 'https://youtube.com/watch?v=fdt-autocad-basico',
        dateAdded: toISO(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)),
        isRead: false,
        tags: ['videoaula', 'autocad'],
      },
    ],
    attendance: {
      totalClasses: 10,
      attendedClasses: 8,
      percentage: 80,
      lastUpdated: toISO(today),
    },
  },
  {
    id: 'qexp',
    code: 'QEXP',
    name: 'Química Experimental',
    department: 'Química / EQ/EQG+EAG+EBG+QIG',
    professor: 'Prof. Dr. Fernanda Oliveira',
    classCode: 'EQ/EQG+EAG+EBG+QIG - Turma 1',
    schedule: {
      days: ['sex'],
      startTime: '14:00',
      endTime: '18:00',
      room: 'Laboratório 1 - Bloco C',
    },
    nextClass: {
      date: toISO(new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000)), // Sexta
      topic: 'Cromatografia em Camada Delgada - Separação de Corantes',
      room: 'Laboratório 1 - Bloco C',
    },
    nextExam: {
      date: toISO(new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000)),
      title: 'Prova Final - Relatório Integrado',
      weight: 0.5,
      room: 'Laboratório 1 - Bloco C',
    },
    tasks: [
      {
        id: 'qexp-task-1',
        title: 'Relatório Lab - Espectrofotometria UV-Vis',
        description: 'Curva de calibração, lei de Beer-Lambert, concentração desconhecida',
        dueDate: toISO(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)),
        status: 'in_progress',
        priority: 'high',
        estimatedHours: 3,
      },
      {
        id: 'qexp-task-2',
        title: 'Pré-relatório: Cromatografia TLC',
        description: 'Princípio, fases móvel/estacionária, fator de retenção (Rf)',
        dueDate: toISO(new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000)),
        status: 'pending',
        priority: 'medium',
        estimatedHours: 2,
      },
    ],
    progress: {
      overall: 50,
      attendance: 88,
      grades: 65,
      materialsRead: 55,
      tasksCompleted: 40,
    },
    materials: [
      {
        id: 'qexp-mat-1',
        title: 'Roteiro: Espectrofotometria UV-Vis',
        type: 'pdf',
        url: '/materiais/qexp/espectrofotometria.pdf',
        dateAdded: toISO(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)),
        isRead: true,
        tags: ['roteiro', 'lab'],
      },
      {
        id: 'qexp-mat-2',
        title: 'Artigo: Aplicações de TLC em Controle de Qualidade',
        type: 'link',
        url: 'https://example.com/tlc-controle-qualidade',
        dateAdded: toISO(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)),
        isRead: false,
        tags: ['artigo', 'tlc'],
      },
    ],
    attendance: {
      totalClasses: 6,
      attendedClasses: 5,
      percentage: 83,
      lastUpdated: toISO(today),
    },
  },
  {
    id: 'qan',
    code: 'QAN',
    name: 'Química Analítica',
    department: 'Química / EBG/EAG',
    professor: 'Prof. Dr. Paulo Mendes',
    classCode: 'EBG/EAG-1223/F3 04 - Turma 3',
    schedule: {
      days: ['qua', 'sex'],
      startTime: '10:00',
      endTime: '11:30',
      room: 'Sala 102 - Bloco E',
    },
    nextClass: {
      date: toISO(dayAfterTomorrow),
      topic: 'Métodos Eletroquímicos - Potenciometria e Voltametria',
      room: 'Sala 102 - Bloco E',
    },
    nextExam: {
      date: toISO(new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)),
      title: 'Prova 2 - Métodos Espectroscópicos e Eletroquímicos',
      weight: 0.35,
      room: 'Sala 102 - Bloco E',
    },
    tasks: [
      {
        id: 'qan-task-1',
        title: 'Lista de Problemas - Espectroscopia Molecular',
        description: 'Exercícios de UV-Vis, IR, RMN - interpretação de espectros',
        dueDate: toISO(tomorrow),
        status: 'pending',
        priority: 'medium',
        estimatedHours: 3,
      },
      {
        id: 'qan-task-2',
        title: 'Resumo: Eletroquímica Analítica',
        description: 'Células eletroquímicas, eletrodos de referência, séries de potencial',
        dueDate: toISO(new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)),
        status: 'pending',
        priority: 'high',
        estimatedHours: 4,
      },
    ],
    progress: {
      overall: 60,
      attendance: 92,
      grades: 68,
      materialsRead: 75,
      tasksCompleted: 45,
    },
    materials: [
      {
        id: 'qan-mat-1',
        title: 'Slides: Métodos Espectroscópicos',
        type: 'slide',
        url: '/materiais/qan/espectroscopicos.pdf',
        dateAdded: toISO(new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000)),
        isRead: true,
        tags: ['slides', 'espectroscopia'],
      },
      {
        id: 'qan-mat-2',
        title: 'Tabela Periódica de Potenciais Padrão',
        type: 'pdf',
        url: '/materiais/qan/potenciais-padrao.pdf',
        dateAdded: toISO(new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)),
        isRead: false,
        tags: ['referencia', 'eletroquimica'],
      },
    ],
    attendance: {
      totalClasses: 11,
      attendedClasses: 10,
      percentage: 91,
      lastUpdated: toISO(today),
    },
  },
];

export function getSubjectById(id: string): Subject | undefined {
  return mockSubjects.find(s => s.id === id);
}

export function getSubjectsByPriority(): Subject[] {
  return [...mockSubjects].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    // We need to compute priority first
    // For now, sort by progress (lower first = more urgent)
    return a.progress.overall - b.progress.overall;
  });
}

export function getSubjectSummaries(now: Date = new Date()) {
  const { createSubjectSummary } = require('./types');
  return mockSubjects.map(s => createSubjectSummary(s, now));
}