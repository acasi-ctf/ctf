"""add challenge features and flags

Revision ID: 577e3355a0e3
Revises: cd0b94f49e8a
Create Date: 2021-11-15 18:09:13.202599

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '577e3355a0e3'
down_revision = 'cd0b94f49e8a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('challenge', sa.Column('features', postgresql.JSONB(astext_type=sa.Text()), server_default='[]', nullable=False))
    op.add_column('challenge', sa.Column('flag', postgresql.JSONB(astext_type=sa.Text()), server_default='{"type": "none"}', nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('challenge', 'flag')
    op.drop_column('challenge', 'features')
    # ### end Alembic commands ###
