"""add environment id to user challenges

Revision ID: b8d0f7f85bdd
Revises: 577e3355a0e3
Create Date: 2021-11-15 19:02:56.433682

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b8d0f7f85bdd'
down_revision = '577e3355a0e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_challenges', sa.Column('environment_id', postgresql.UUID(as_uuid=True), server_default='00000000-0000-0000-0000-000000000000', nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user_challenges', 'environment_id')
    # ### end Alembic commands ###
